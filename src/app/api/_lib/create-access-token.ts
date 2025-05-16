import { IUser } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import jwt from 'jsonwebtoken';

export const createAccessToken = (
  user: Pick<IUser, 'email' | 'hash_password' | 'is_admin' | 'username' | 'id'>
) => {
  return jwt.sign(user, getEnvVar('PRIVATE_KEY_JWT'), { expiresIn: '10m' });
};
