import Joi from 'joi';
import { IReaction } from './reaction';
import { TopicIdSchema } from '@entities/Topic';
import { UserIdSchema } from '@entities/User';

export const ReactionSchema = Joi.object<IReaction>({
  topic_id: TopicIdSchema.required(),
  user_id: UserIdSchema.required(),
  type_reaction: Joi.string().valid('like').required(),
  created_at: Joi.number().default(new Date().getTime()),
});
