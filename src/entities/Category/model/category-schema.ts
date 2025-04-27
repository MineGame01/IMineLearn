import Joi from 'joi';
import { ICategory, MAX_CATEGORY_NAME_LENGTH } from './Category';

export const CategoryImageBase64Schema = Joi.string().base64();

export const CategorySchema = Joi.object<ICategory>({
  name: Joi.string().max(MAX_CATEGORY_NAME_LENGTH).required(),
  image_base64_1200x: CategoryImageBase64Schema.default(null),
  image_base64_415x: CategoryImageBase64Schema.default(null),
  topicsCount: Joi.number().default(0),
  lastActivity: Joi.number().default(null),
  lastTopicId: Joi.string().uuid().default(null),
});

export const CategoryIdSchema = Joi.string().uuid();
