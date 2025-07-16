import Joi from 'joi';
import { TReactionDate } from './reaction';
import { TopicIdSchema } from '@entities/Topic';
import { UserIdSchema } from '@entities/User';

export const ReactionSchema = Joi.object<TReactionDate>({
  topic_id: TopicIdSchema.required(),
  user_id: UserIdSchema.required(),
  type_reaction: Joi.string().valid('like').required(),
  created_at: Joi.date().default(new Date()),
});
