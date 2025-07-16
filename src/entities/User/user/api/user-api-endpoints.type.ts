import { TGetProfileEndpointInfo } from '@entities/User/profile/api/profile-api-endpoints.type';
import { Hookify, IEndpointInfo, TEndpointFn } from '@shared/api';

export type TGetUserEndpointInfo = IEndpointInfo<
  { user_id?: string; username?: string },
  {
    id: string;
    username: string;
    email: string;
    created_at: number | null;
  }
>;

export type TGetUserAndProfileEndpointInfo = IEndpointInfo<
  TGetUserEndpointInfo['payload'],
  TGetUserEndpointInfo['response'] & { profile: TGetProfileEndpointInfo['response'] }
>;

export interface IUserEndpointsApiQuery {
  getUser: TGetUserEndpointInfo['endpoint'];
  getUserAndProfile: TGetUserAndProfileEndpointInfo['endpoint'];
}

export type TUserEndpointsApi = IUserEndpointsApiQuery;

export type TUserApiQueryHooks = Hookify<Record<string, TEndpointFn> & IUserEndpointsApiQuery>;

export type TUserHooksApi = TUserApiQueryHooks;

export type TUserApi = TUserHooksApi & TUserEndpointsApi;
