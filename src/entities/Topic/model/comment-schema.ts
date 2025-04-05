import Joi from 'joi';
import { IComment, MAX_COMMENT_CONTENT_LENGTH, MIN_COMMENT_CONTENT_LENGTH } from './ITopic';

export const CommentSchema = Joi.object<Omit<IComment, '_id'>, true>({
  content: Joi.string().min(MIN_COMMENT_CONTENT_LENGTH).max(MAX_COMMENT_CONTENT_LENGTH).required(),
  created_at: Joi.number().default(new Date().getTime()),
  user_id: Joi.string().required(),
  topic_id: Joi.string().required(),
});
