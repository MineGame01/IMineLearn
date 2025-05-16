import { UserEmailSchema, UserUsernameSchema } from '@entities/User';
import Joi from 'joi';
import { PasswordSchema } from './auth-schema';

export const RegistrationSchema = Joi.object({
  username: UserUsernameSchema.required(),
  email: UserEmailSchema.required(),
  password: PasswordSchema.required(),
  password_repeated: Joi.ref('password'),
});
