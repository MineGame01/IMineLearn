import Joi from 'joi';
import { IReaction } from './reaction';

export const ReactionSchema = Joi.object<IReaction>({
  topic_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
  type_reaction: Joi.string().valid('like').required(),
  created_at: Joi.number().default(new Date().getTime()),
});
