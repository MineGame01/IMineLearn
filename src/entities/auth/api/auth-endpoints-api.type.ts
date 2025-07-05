import { Hookify, IEndpointInfo, TEndpointFn } from '@shared/api';

interface IAuthResponse {
  access_token: string;
  user_id: string;
}

export type TLoginEndpointInfo = IEndpointInfo<
  { email: string; password: string },
  IAuthResponse,
  'mutation'
>;

export type TRegistrationEndpointInfo = IEndpointInfo<
  { username: string; email: string; password: string },
  IAuthResponse,
  'mutation'
>;

export type TRefreshTokenEndpointInfo = IEndpointInfo<void, IAuthResponse>;

export type TLogoutEndpointInfo = IEndpointInfo<void, 'Logout successful!'>;

export interface IAuthEndpointsApiMutation {
  login: TLoginEndpointInfo['endpoint'];
  registration: TRegistrationEndpointInfo['endpoint'];
  refreshToken: TRefreshTokenEndpointInfo['endpoint'];
  logout: TLogoutEndpointInfo['endpoint'];
}

export type TAuthEndpointsApi = IAuthEndpointsApiMutation;

export type TAuthApiMutationHooks = Hookify<
  Record<string, TEndpointFn> & IAuthEndpointsApiMutation,
  'mutation'
>;

export type TAuthApi = IAuthEndpointsApiMutation & TAuthApiMutationHooks;
