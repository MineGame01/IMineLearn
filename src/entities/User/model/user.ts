export const MIN_USER_USERNAME_LENGTH = 3;
export const MAX_USER_USERNAME_LENGTH = 16;
export const MAX_USER_BIO_LENGTH = 255;

export interface IUser {
  _id: string;
  username: string;
  bio: string | null;
  email: string;
  hash_password: string;
  is_admin: boolean;
  created_at: number;
  salt: string;
}

export interface IAuthUser extends Omit<IUser, 'hash_password' | 'salt' | 'email'> {
  email: TUserEmail | null;
}

export type TUserId = IUser['_id'];
export type TUserUserName = IUser['username'];
export type TUserBio = IUser['bio'];
export type TUserEmail = IUser['email'];
export type TUserHashPassword = IUser['hash_password'];
export type TUserIsAdmin = IUser['is_admin'];
export type TUserCreatedAt = IUser['created_at'];
export type TUserSalt = IUser['salt'];
