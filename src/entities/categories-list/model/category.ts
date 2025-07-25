import { TGetTimeType, TTimeType } from '@shared/model';
import { TTopicId } from '../../Topic';

export const MAX_CATEGORY_NAME_LENGTH = 30;

export type TCategoryImageBase64 = string | null;

export interface ICategory<GTime extends TTimeType = 'timestamp'> {
  id: string;
  image_base64_1200x: TCategoryImageBase64;
  image_base64_415x: TCategoryImageBase64;
  name: string;
  topicsCount: number;
  lastActivity: TGetTimeType<GTime> | null;
  lastTopicId: TTopicId | null;
}

export type TCategoryDate = ICategory<'date'>;

export type TCategoryId = ICategory['id'];
export type TCategoryName = ICategory['name'];
export type TCategoryTopicsCount = ICategory['topicsCount'];
export type TCategoryLastActivity = ICategory['lastActivity'];
export type TCategoryLastTopicId = ICategory['lastTopicId'];
