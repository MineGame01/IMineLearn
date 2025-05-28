import { getEnvVar } from '@shared/lib';
import jwt from 'jsonwebtoken';
import { IAccessToken } from '../_model/access-token.type';

export const createAccessToken = (user: IAccessToken) => {
  return jwt.sign(user, getEnvVar('PRIVATE_KEY_JWT'), { expiresIn: '10m' });
};
