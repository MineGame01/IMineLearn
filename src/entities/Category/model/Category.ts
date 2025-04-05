import { TTopicId } from '../../Topic';

export interface ICategory {
  _id: string;
  name: string;
  topicsCount: number;
  lastActivity: number | null;
  lastTopicId: TTopicId | null;
}

export type TCategoryId = ICategory['_id'];
export type TCategoryName = ICategory['name'];
export type TCategoryTopicsCount = ICategory['topicsCount'];
export type TCategoryLastActivity = ICategory['lastActivity'];
export type TCategoryLastTopicId = ICategory['lastTopicId'];
