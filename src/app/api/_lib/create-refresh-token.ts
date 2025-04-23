import { TUserId } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import jwt from 'jsonwebtoken';

export const createRefreshToken = (userId: TUserId) => {
  return jwt.sign({ user_id: userId }, getEnvVar('PRIVATE_KEY_JWT'), {
    expiresIn: '30d',
  });
};
