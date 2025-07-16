import Joi from 'joi';
import { MAX_TOPIC_TITLE_LENGTH, MIN_TOPIC_TITLE_LENGTH, TTopicDate } from './ITopic';
import { UserIdSchema } from '@entities/User';
import { CategoryIdSchema } from '@entities/categories-list';

export const TopicTitleSchema = Joi.string()
  .min(MIN_TOPIC_TITLE_LENGTH)
  .max(MAX_TOPIC_TITLE_LENGTH);

export const TopicSchema = Joi.object<TTopicDate>({
  title: TopicTitleSchema.required(),
  content: Joi.string().required(),
  category_id: CategoryIdSchema.required(),
  user_id: UserIdSchema.required(),
  views_count: Joi.number().default(0),
  created_at: Joi.date().default(new Date()),
});

export const TopicIdSchema = Joi.string().uuid();
