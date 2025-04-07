import { TTopicId } from '@entities/Topic';
import { TUserId } from '@entities/User';

export interface IReaction {
  _id: string;
  topic_id: TTopicId;
  user_id: TUserId;
  type_reaction: 'like';
  created_at: number;
}

export type TReactionType = IReaction['type_reaction'];
