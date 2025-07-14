import Joi from 'joi';
import { UserIdSchema } from '@entities/User/user';
import { TProfile } from './profile.type';

export const MAX_PROFILE_BIO_LENGTH = 255;

export const ProfileBioSchema = Joi.string().max(MAX_PROFILE_BIO_LENGTH).allow(null);

export const ProfileSchema = Joi.object<TProfile>({
  is_admin: Joi.boolean().default(false),
  avatar: Joi.string().allow(null).default(null),
  user_id: UserIdSchema.required(),
  bio: ProfileBioSchema.default(null),
  created_at: Joi.number().default(new Date().getTime()),
  updated_at: Joi.number().allow(null).default(null),
});
