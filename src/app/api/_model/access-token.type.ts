import { IUser } from '@entities/User';
import jwt from 'jsonwebtoken';

export type IAccessToken = Pick<IUser, 'email' | 'hash_password' | 'is_admin' | 'username' | 'id'> &
  jwt.JwtPayload;
