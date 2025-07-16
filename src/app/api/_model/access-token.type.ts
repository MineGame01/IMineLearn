import { IUser, TProfile } from '@entities/User';
import jwt from 'jsonwebtoken';

export type IAccessToken = Pick<IUser, 'email' | 'hash_password' | 'username' | 'id'> &
  Pick<TProfile, 'is_admin'> &
  jwt.JwtPayload;
