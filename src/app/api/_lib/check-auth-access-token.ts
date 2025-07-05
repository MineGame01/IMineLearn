import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { IUser } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import { THandlerRequest } from '../_model/handler-request.type';
import {
  ResponseError,
  ResponseNoRightAdministrationError,
  ResponseTokenError,
  ResponseTokenExpiredError,
} from '@shared/model';

type TDecoded = string | jwt.JwtPayload | undefined;

export const checkAuthAccessToken = (handler: THandlerRequest, is_admin?: boolean) => {
  return async (request: NextRequest) => {
    const authorization: string | null = request.headers.get('Authorization');

    if (!authorization) {
      throw new ResponseError('Request not authorized!', 401, 'REQUEST-NOT-AUTHORIZED');
    }

    const getDecoded = async () => {
      return new Promise<TDecoded>((resolve, reject) => {
        jwt.verify(authorization, getEnvVar('PRIVATE_KEY_JWT'), (error, decoded) => {
          if (error) reject(error);
          resolve(decoded);
        });
      });
    };

    let decoded: TDecoded = undefined;

    try {
      decoded = await getDecoded();
    } catch (error: unknown) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ResponseTokenError();
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new ResponseTokenExpiredError();
      } else {
        throw error;
      }
    }
    if (decoded && typeof decoded === 'object') {
      request.auth = decoded as IUser;
      if (is_admin && !request.auth.is_admin) {
        throw new ResponseNoRightAdministrationError();
      }
      return await handler(request);
    }
  };
};
