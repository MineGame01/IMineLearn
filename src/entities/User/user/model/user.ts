import { TGetUserEndpointInfo } from '../api/user-api-endpoints.type';

export const MIN_USER_USERNAME_LENGTH = 3;
export const MAX_USER_USERNAME_LENGTH = 16;

export interface IUser {
  id: string;
  username: string;
  email: string;
  hash_password: string;
  created_at: number | null;
  salt: string;
}

export type TAuthUser = TGetUserEndpointInfo['response'];

export type TUserId = IUser['id'];
export type TUserUserName = IUser['username'];
export type TUserEmail = IUser['email'];
export type TUserHashPassword = IUser['hash_password'];
export type TUserCreatedAt = IUser['created_at'];
export type TUserSalt = IUser['salt'];
