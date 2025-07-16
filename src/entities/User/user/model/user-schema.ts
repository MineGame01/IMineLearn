import Joi from 'joi';
import { MAX_USER_USERNAME_LENGTH, MIN_USER_USERNAME_LENGTH, TUserDate } from '@entities/User';

export const UserEmailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});

export const UserUsernameSchema = Joi.string()
  .alphanum()
  .min(MIN_USER_USERNAME_LENGTH)
  .max(MAX_USER_USERNAME_LENGTH);

export const UserSchema = Joi.object<TUserDate>({
  username: UserUsernameSchema.required(),
  email: UserEmailSchema.required(),
  hash_password: Joi.string().hex().required(),
  created_at: Joi.date().default(new Date()),
  salt: Joi.string().hex().min(5).required(),
});

export const UserIdSchema = Joi.string().uuid();
