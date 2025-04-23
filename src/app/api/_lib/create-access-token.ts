import { IUser } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import jwt from 'jsonwebtoken';

export const createAccessToken = (user: IUser) => {
  return jwt.sign(user, getEnvVar('PRIVATE_KEY_JWT'), { expiresIn: '10m' });
};
