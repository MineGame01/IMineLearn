import { TCategoryId } from '@entities/categories-list';
import { TUserId } from '@entities/User';
import { TGetTimeType, TTimeType } from '@shared/model';

export const MAX_TOPIC_TITLE_LENGTH = 80;
export const MIN_TOPIC_TITLE_LENGTH = 5;

export const MAX_COMMENT_CONTENT_LENGTH = 500;
export const MIN_COMMENT_CONTENT_LENGTH = 5;

export interface ITopic<GTime extends TTimeType = 'timestamp'> {
  id: string;
  user_id: TUserId;
  views_count: number;
  category_id: TCategoryId;
  created_at: TGetTimeType<GTime>;
  title: string;
  content: string;
}

export type TTopicDate = ITopic<'date'>;

export type TTopicViewsCount = ITopic['views_count'];
export type TTopicTitle = ITopic['title'];
export type TTopicId = ITopic['id'];
export type TTopicContent = ITopic['content'];

export interface IComment<GTime extends TTimeType = 'timestamp'>
  extends Pick<ITopic<GTime>, 'id' | 'content' | 'created_at' | 'user_id'> {
  topic_id: TTopicId;
}

export type TCommentDate = IComment<'date'>;

export type TCommentId = IComment['id'];
