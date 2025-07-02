import { IEndpointInfo, TEndpointFn } from '@shared/api';
import { IComment, TCommentId, TTopicContent, TTopicId } from '../model/ITopic';
import { TMutationHook, TQueryHook } from '@shared/api';

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

type Hookify<T extends Record<string, TEndpointFn>, type extends 'query' | 'mutation' = 'query'> = {
  [K in keyof T as `use${Capitalize<string & K>}${type extends 'query' ? 'Query' : 'Mutation'}`]: type extends 'query'
    ? TQueryHook<T[K]>
    : TMutationHook<T[K]>;
};

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
