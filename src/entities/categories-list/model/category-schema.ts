import Joi from 'joi';
import { MAX_CATEGORY_NAME_LENGTH, TCategoryDate } from './category';

export const CategoryImageBase64Schema = Joi.string().base64();

export const CategorySchema = Joi.object<TCategoryDate>({
  name: Joi.string().max(MAX_CATEGORY_NAME_LENGTH).required(),
  image_base64_1200x: CategoryImageBase64Schema.allow(null).default(null),
  image_base64_415x: CategoryImageBase64Schema.allow(null).default(null),
  topicsCount: Joi.number().default(0),
  lastActivity: Joi.date().allow(null).default(null),
  lastTopicId: Joi.string().uuid().allow(null).default(null),
});

export const CategoryIdSchema = Joi.string().uuid();
