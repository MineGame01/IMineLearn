import { IProfile, IUser } from '@entities/User';
import jwt from 'jsonwebtoken';

export type IAccessToken = Pick<IUser, 'email' | 'hash_password' | 'username' | 'id'> &
  Pick<IProfile, 'is_admin'> &
  jwt.JwtPayload;
