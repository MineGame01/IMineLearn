import { RefreshToken } from '../_model/refresh-token';
import { jwtVerify } from './jwt-verify';

export const RefreshTokenVerify = async (refresh_token: string) => {
  const jwtPayload = await jwtVerify(refresh_token);

  if (jwtPayload && typeof jwtPayload === 'object') {
    if ('user_id' in jwtPayload) {
      if (typeof jwtPayload.user_id === 'string') {
        return new RefreshToken(jwtPayload);
      }
    }
  }

  return null;
};
