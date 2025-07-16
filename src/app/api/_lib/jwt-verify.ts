import { getEnvVar } from '@shared/lib';
import jwt from 'jsonwebtoken';

export const jwtVerify = (token: string) => {
  return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
    jwt.verify(token, getEnvVar('PRIVATE_KEY_JWT'), (error, jwtPayload) => {
      if (error) reject(error);
      else resolve(jwtPayload);
    });
  });
};
