import Joi from 'joi';
import { IUser, MAX_USER_USERNAME_LENGTH, MIN_USER_USERNAME_LENGTH } from '@entities/User';

export const UserEmailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});

export const UserUsernameSchema = Joi.string()
  .alphanum()
  .min(MIN_USER_USERNAME_LENGTH)
  .max(MAX_USER_USERNAME_LENGTH);

export const UserSchema = Joi.object<IUser>({
  username: UserUsernameSchema.required(),
  email: UserEmailSchema.required(),
  hash_password: Joi.string().hex().required(),
  created_at: Joi.number().default(new Date().getTime()),
  salt: Joi.string().hex().min(5).required(),
});

export const UserIdSchema = Joi.string().uuid();
