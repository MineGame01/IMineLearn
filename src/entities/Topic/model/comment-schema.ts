import Joi from 'joi';
import { MAX_COMMENT_CONTENT_LENGTH, MIN_COMMENT_CONTENT_LENGTH, TCommentDate } from './ITopic';
import { UserIdSchema } from '@entities/User';
import { TopicIdSchema } from './topic-schema';

export const CommentSchema = Joi.object<TCommentDate>({
  content: Joi.string().min(MIN_COMMENT_CONTENT_LENGTH).max(MAX_COMMENT_CONTENT_LENGTH).required(),
  created_at: Joi.date().default(new Date()),
  user_id: UserIdSchema.required(),
  topic_id: TopicIdSchema.required(),
});
