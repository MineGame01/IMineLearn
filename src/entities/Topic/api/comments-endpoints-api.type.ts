import { Hookify, IEndpointInfo, TEndpointFn } from '@shared/api';
import { IComment, TCommentId, TTopicContent, TTopicId } from '../model/ITopic';

export type TGetCommentsByTopicIdEndpointInfo = IEndpointInfo<
  {
    topic_id: TTopicId;
    limit_count?: number;
    offset_count?: number;
    return_ids_only?: boolean;
  },
  IComment[]
>;

export type TCreateCommentEndpointInfo = IEndpointInfo<
  {
    topic_id: TTopicId;
    content: TTopicContent;
  },
  null,
  'mutation'
>;

export type TGetCommentByIdEndpointInfo = IEndpointInfo<TCommentId, IComment>;

export type TDeleteCommentEndpointInfo = IEndpointInfo<TCommentId, null, 'mutation'>;

export interface ICommentsEndpointsApiQueries {
  getCommentsByTopicId: TGetCommentsByTopicIdEndpointInfo['endpoint'];
  getCommentById: TGetCommentByIdEndpointInfo['endpoint'];
}

export interface ICommentsEndpointsApiMutation {
  createComment: TCreateCommentEndpointInfo['endpoint'];
  deleteComment: TDeleteCommentEndpointInfo['endpoint'];
}

export type TCommentsEndpointsApi = ICommentsEndpointsApiQueries & ICommentsEndpointsApiMutation;

export type TCommentsApiQueryHooks = Hookify<
  Record<string, TEndpointFn> & ICommentsEndpointsApiQueries
>;
export type TCommentsApiMutationHooks = Hookify<
  Record<string, TEndpointFn> & ICommentsEndpointsApiMutation,
  'mutation'
>;

export type TCommentsApi = ICommentsEndpointsApiQueries &
  ICommentsEndpointsApiMutation &
  TCommentsApiQueryHooks &
  TCommentsApiMutationHooks;
