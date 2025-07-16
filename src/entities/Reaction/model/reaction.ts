import { TTopicId } from '@entities/Topic';
import { TUserId } from '@entities/User';
import { TGetTimeType, TTimeType } from '@shared/model';

export interface IReaction<GTime extends TTimeType = 'timestamp'> {
  id: string;
  topic_id: TTopicId;
  user_id: TUserId;
  type_reaction: string;
  created_at: TGetTimeType<GTime>;
}

export type TReactionDate = IReaction<'date'>;

export type TReactionType = IReaction['type_reaction'];
