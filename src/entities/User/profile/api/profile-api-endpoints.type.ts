import { TUserId, TUserUserName } from '@entities/User/user';
import { Hookify, IEndpointInfo, TEndpointFn } from '@shared/api';
import { TProfileBio } from '../model/profile.type';

export type TGetProfileEndpointInfo = IEndpointInfo<
  { username?: TUserUserName; user_id?: TUserId },
  {
    id: string;
    user_id: TUserId;
    avatar: string | null;
    is_admin: boolean;
    bio: string | null;
    created_at: number;
    updated_at: number | null;
  }
>;

export interface IUpdateProfileEndpointPayload {
  username?: TUserUserName;
  bio?: TProfileBio;
}
export type TUpdateProfileEndpointInfo = IEndpointInfo<
  IUpdateProfileEndpointPayload,
  Required<IUpdateProfileEndpointPayload>,
  'mutation'
>;

export interface IProfileEndpointsApiMutation {
  updateProfile: TUpdateProfileEndpointInfo['endpoint'];
}

export interface IProfileEndpointsApiQuery {
  getProfile: TGetProfileEndpointInfo['endpoint'];
}

export type TProfileEndpointsApi = IProfileEndpointsApiMutation & IProfileEndpointsApiQuery;

export type TProfileApiMutationHooks = Hookify<
  Record<string, TEndpointFn> & IProfileEndpointsApiMutation,
  'mutation'
>;
export type TProfileApiQueryHooks = Hookify<
  Record<string, TEndpointFn> & IProfileEndpointsApiQuery
>;

export type TProfileHooksApi = TProfileApiMutationHooks & TProfileApiQueryHooks;

export type TProfileApi = TProfileHooksApi & TProfileEndpointsApi;
