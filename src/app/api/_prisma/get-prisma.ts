import { CategorySchema } from '@entities/categories-list';
import { PrismaClient } from '@prisma/client';
import { validateManySchema } from './validate-many-shema';
import { CommentSchema, TopicSchema } from '@entities/Topic';
import { updateCategoryToLatestTopic } from './update-category-to-latest-topic';
import { updateAllCategoriesToLatestTopic } from './update-all-categories-to-latest-topic';
import {
  TUserBio,
  TUserEmail,
  TUserUserName,
  UserBioSchema,
  UserSchema,
  UserUsernameSchema,
} from '@entities/User';
import { AuthSchema } from '@entities/LoginModal';
import crypto from 'crypto';
import { ReactionSchema } from '@entities/Reaction';
import { ReportSchema } from '@entities/Report';
import Joi from 'joi';
import { revalidateTag } from 'next/cache';
import {
  ResponseLoginCredentialsIncorrectError,
  ResponseNotFoundError,
  ResponseParamIsRequiredError,
  ResponseUsernameAlreadyUsedError,
  ResponseUserNotFoundError,
} from '@shared/model';

export const getPrisma = () => {
  const prisma = new PrismaClient().$extends({
    query: {
      categories: {
        async create({ query, args }) {
          args.data = await CategorySchema.validateAsync(args.data);
          return query(args).then((result) => {
            revalidateTag('categories-list');
            return result;
          });
        },
        async createMany({ query, args }) {
          args.data = await validateManySchema(args.data, CategorySchema);
          return query(args).then((result) => {
            revalidateTag('categories-list');
            return result;
          });
        },
        async delete({ query, args }) {
          return query(args).then(async (result) => {
            if (result.id) await prisma.topics.deleteMany({ where: { category_id: result.id } });
            revalidateTag('categories-list');
            if (result.id) revalidateTag(`categoryid-${result.id}`);
            return result;
          });
        },
        async findFirst({ query, args }) {
          return query(args).then((result) => {
            if (!result) {
              throw new ResponseNotFoundError('Category');
            }
            return result;
          });
        },
        // async deleteMany({ query, args }) {
        //   return query(args)
        //     .then(async (result) => {
        //       const id = args.where?.id;
        //       id && (await prisma.topics.deleteMany({ where: { category_id: id.toString() } }));
        //       return result;
        //     })
        //     .catch((error) => error);
        // },
      },
      topics: {
        async create({ query, args }) {
          args.data = await TopicSchema.validateAsync(args.data);
          return query(args).then(async (result) => {
            await updateCategoryToLatestTopic(prisma, args.data.category_id);
            return result;
          });
        },
        async createMany({ args, query }) {
          args.data = await validateManySchema(args.data, TopicSchema);
          const { data } = args;
          return query(args).then(async (result) => {
            if (Array.isArray(data)) {
              for (const topic of data) {
                await updateCategoryToLatestTopic(prisma, topic.category_id);
              }
            } else {
              await updateCategoryToLatestTopic(prisma, data.category_id);
            }
            return result;
          });
        },
        async delete({ query, args }) {
          return query(args).then(async (result) => {
            const { category_id, id } = result;

            if (category_id) {
              await prisma.reactions.deleteMany({ where: { topic_id: id } });
              await prisma.comments.deleteMany({ where: { topic_id: id } });
              await updateCategoryToLatestTopic(prisma, category_id.toString());
            } else {
              await updateAllCategoriesToLatestTopic(prisma);
            }

            return result;
          });
        },
        async findFirst({ query, args }) {
          return query(args).then((result) => {
            if (!result) {
              throw new ResponseNotFoundError('Topic');
            }
            return result;
          });
        },
        // async deleteMany({ query, args }) {
        //   return query(args)
        //     .then(async (result) => {
        //       await updateAllCategoriesToLatestTopic(prisma);
        //       return result;
        //     })
        //     .catch((error) => error);
        // },
      },
      users: {
        async create({ query, args }) {
          const { username, email, hash_password, salt } = args.data;
          args.data = await UserSchema.validateAsync({ username, email, hash_password, salt });
          return query(args);
        },
        async update({ query, args }) {
          args.data = await Joi.object<{ username?: TUserUserName; bio?: TUserBio | null }>({
            username: UserUsernameSchema,
            bio: UserBioSchema.allow(null),
          }).validateAsync(args.data);
          args.data.updated_at = new Date().getTime();
          return query(args);
        },
      },
      comments: {
        async create({ query, args }) {
          args.data = await CommentSchema.validateAsync(args.data);
          return query(args);
        },
        async createMany({ query, args }) {
          const { data } = args;
          if (Array.isArray(data)) {
            args.data = await validateManySchema(data, CommentSchema);
          } else {
            args.data = await CommentSchema.validateAsync(args.data);
          }
          return query(args);
        },
        async findFirst({ query, args }) {
          return query(args).then((result) => {
            if (!result) {
              throw new ResponseNotFoundError('Comment');
            }
            return result;
          });
        },
      },
      reactions: {
        async create({ query, args }) {
          args.data = await ReactionSchema.validateAsync(args.data);
          return query(args);
        },
        async createMany({ query, args }) {
          const { data } = args;
          if (Array.isArray(data)) {
            args.data = await validateManySchema(data, ReactionSchema);
          } else {
            args.data = await ReactionSchema.validateAsync(data);
          }
          return query(args);
        },
      },
      reports: {
        async create({ query, args }) {
          args.data = await ReportSchema.validateAsync(args.data);
          return query(args);
        },
        async createMany({ query, args }) {
          const { data } = args;
          if (Array.isArray(data)) {
            args.data = await validateManySchema(data, ReportSchema);
          } else {
            args.data = await ReportSchema.validateAsync(data);
          }
          return query(args);
        },
      },
    },
    model: {
      users: {
        async registration({
          username,
          email,
          password,
        }: {
          email: TUserEmail | null;
          username: TUserUserName | null;
          password: string | null;
        }) {
          if (!username) throw new ResponseParamIsRequiredError(false, 'Username');
          const login_credentials = (await AuthSchema.validateAsync({ email, password })) as {
            email: string;
            password: string;
          };
          const user = await prisma.users.findFirst({ where: { username } });
          if (user) throw new ResponseUsernameAlreadyUsedError(username);

          const salt = crypto.randomBytes(16).toString('hex');

          const getDerivedKey = async () => {
            return new Promise<Buffer>((resolve, reject) => {
              crypto.pbkdf2(
                login_credentials.password,
                salt,
                1000,
                64,
                'sha512',
                (error, derivedKey) => {
                  if (error) reject(error);
                  else resolve(derivedKey);
                }
              );
            });
          };

          const hash_password = (await getDerivedKey()).toString('hex');

          const new_user = await prisma.users.create({
            data: { username, email: login_credentials.email, hash_password, salt },
          });
          return new_user;
        },
        async login({ email, password }: { email: TUserEmail | null; password: string | null }) {
          const login_credentials = await AuthSchema.validateAsync({ email, password });
          const user = await prisma.users.findFirst({ where: { email: login_credentials.email } });

          if (user) {
            const getDerivedKey = async () => {
              return await new Promise<Buffer>((resolve, reject) => {
                crypto.pbkdf2(
                  login_credentials.password,
                  user.salt,
                  1000,
                  64,
                  'sha512',
                  (error, derivedKey) => {
                    if (error) reject(error);
                    else resolve(derivedKey);
                  }
                );
              });
            };

            const derivedKey = await getDerivedKey();

            if (
              !crypto.timingSafeEqual(
                Buffer.from(user.hash_password),
                Buffer.from(derivedKey.toString('hex'))
              )
            ) {
              throw new ResponseLoginCredentialsIncorrectError();
            } else {
              return user;
            }
          } else {
            throw new ResponseUserNotFoundError();
          }
        },
      },
    },
  });
  return prisma;
};
