import Joi from 'joi';
import {
  IUser,
  MAX_USER_USERNAME_LENGTH,
  MIN_USER_USERNAME_LENGTH,
  MAX_USER_BIO_LENGTH,
} from '@entities/User';

export const UserSchema = Joi.object<IUser>({
  username: Joi.string()
    .alphanum()
    .min(MIN_USER_USERNAME_LENGTH)
    .max(MAX_USER_USERNAME_LENGTH)
    .required(),
  bio: Joi.string().max(MAX_USER_BIO_LENGTH).default(null),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  hash_password: Joi.string().hex().required(),
  is_admin: Joi.boolean().default(false),
  created_at: Joi.number().default(new Date().getTime()),
  salt: Joi.string().hex().min(5).required(),
});

export const UserIdSchema = Joi.string().uuid();
