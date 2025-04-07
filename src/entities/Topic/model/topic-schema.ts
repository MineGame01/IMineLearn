import Joi from 'joi';
import { ITopic, MAX_TOPIC_TITLE_LENGTH, MIN_TOPIC_TITLE_LENGTH } from './ITopic';
import { UserIdSchema } from '@entities/User';
import { CategoryIdSchema } from '@entities/Category';

export const TopicSchema = Joi.object<ITopic>({
  title: Joi.string().alphanum().min(MIN_TOPIC_TITLE_LENGTH).max(MAX_TOPIC_TITLE_LENGTH).required(),
  content: Joi.string().required(),
  category_id: CategoryIdSchema.required(),
  user_id: UserIdSchema.required(),
  views_count: Joi.number().default(0),
  created_at: Joi.number().default(new Date().getTime()),
});

export const TopicIdSchema = Joi.string().uuid();
