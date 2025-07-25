import { TCategoryId } from '@entities/categories-list';
import { IEndpointInfo } from '@shared/api';
import { TTopicTitle, TTopicContent, TTopicId, ITopic, IComment } from '../model/ITopic';
import { TUserId } from '@entities/User';
import { TGetCommentsByTopicIdEndpointInfo } from './comments-endpoints-api.type';

export type TCreateTopicEndpointInfo = IEndpointInfo<
  {
    category_id: TCategoryId;
    title: TTopicTitle;
    content: TTopicContent;
  },
  TTopicId
>;

export type TDeleteTopicEndpointInfo = IEndpointInfo<{ topic_id: TTopicId }, null>;

export type TGetTopicsEndpointInfo = IEndpointInfo<
  {
    user_id?: TUserId;
    search?: string;
    created_after?: string;
    created_before?: string;
    category_id?: TCategoryId;
    limit_count?: number;
    offset_count?: number;
    return_ids_only?: boolean;
  },
  ITopic[] | TTopicId[]
>;

export type TGetTopicByIdEndpointInfo = IEndpointInfo<TTopicId, ITopic>;

export type TGetTopicByIdAndComments = IEndpointInfo<
  { topic_id: TTopicId } & TGetCommentsByTopicIdEndpointInfo['payload'],
  ITopic & { comments: IComment[] }
>;

export interface ITopicsEndpointsApi {
  createTopic: TCreateTopicEndpointInfo['endpoint'];
  deleteTopic: TDeleteTopicEndpointInfo['endpoint'];
  getTopics: TGetTopicsEndpointInfo['endpoint'];
  getTopicById: TGetTopicByIdEndpointInfo['endpoint'];
  getTopicByIdAndComments: TGetTopicByIdAndComments['endpoint'];
}
