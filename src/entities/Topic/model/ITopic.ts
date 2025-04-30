import { TCategoryId } from '@entities/Category';
import { TUserId } from '@entities/User';

export const MAX_TOPIC_TITLE_LENGTH = 80;
export const MIN_TOPIC_TITLE_LENGTH = 5;

export const MAX_COMMENT_CONTENT_LENGTH = 500;
export const MIN_COMMENT_CONTENT_LENGTH = 5;

export interface ITopic {
  _id: string;
  user_id: TUserId;
  views_count: number;
  category_id: TCategoryId;
  created_at: number;
  title: string;
  content: string;
}

export type TTopicViewsCount = ITopic['views_count'];
export type TTopicTitle = ITopic['title'];
export type TTopicId = ITopic['_id'];
export type TTopicContent = ITopic['content'];

export interface IComment extends Pick<ITopic, '_id' | 'content' | 'created_at' | 'user_id'> {
  topic_id: TTopicId;
}

export type TCommentId = IComment['_id'];
