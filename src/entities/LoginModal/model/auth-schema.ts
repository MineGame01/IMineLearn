import { UserEmailSchema } from '@entities/User';
import Joi from 'joi';

export const PasswordSchema = Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

export const AuthSchema = Joi.object({
  email: UserEmailSchema.required(),
  password: PasswordSchema.required(),
});
