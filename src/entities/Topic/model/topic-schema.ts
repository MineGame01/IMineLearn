import Joi from 'joi';
import { ITopic, MAX_TOPIC_TITLE_LENGTH, MIN_TOPIC_TITLE_LENGTH } from './ITopic';

export const TopicSchema = Joi.object<Omit<ITopic, '_id'>, true>({
  title: Joi.string().min(MIN_TOPIC_TITLE_LENGTH).max(MAX_TOPIC_TITLE_LENGTH).required(),
  content: Joi.string().required(),
  category_id: Joi.string().required(),
  user_id: Joi.string().required(),
  views_count: Joi.number().default(0),
  created_at: Joi.number().default(new Date().getTime()),
});
