import Joi from 'joi';

export const CategoryIdSchema = Joi.string().uuid();
