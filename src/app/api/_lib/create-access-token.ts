import { getEnvVar } from '@shared/lib';
import jwt from 'jsonwebtoken';
import { IAccessToken } from '../_model/access-token.type';

export const createAccessToken = (payload: IAccessToken) => {
  return jwt.sign(payload, getEnvVar('PRIVATE_KEY_JWT'), { expiresIn: '10m' });
};
