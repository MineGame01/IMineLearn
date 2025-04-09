import Joi from 'joi';
import { IComment, MAX_COMMENT_CONTENT_LENGTH, MIN_COMMENT_CONTENT_LENGTH } from './ITopic';
import { UserIdSchema } from '@entities/User';
import { TopicIdSchema } from './topic-schema';

export const CommentSchema = Joi.object<IComment>({
  content: Joi.string().min(MIN_COMMENT_CONTENT_LENGTH).max(MAX_COMMENT_CONTENT_LENGTH).required(),
  created_at: Joi.number().default(new Date().getTime()),
  user_id: UserIdSchema.required(),
  topic_id: TopicIdSchema.required(),
});
