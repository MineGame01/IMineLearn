import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { IUser } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import { THandlerRequest } from '../_model/handler-request.type';
import { ResponseError, ResponseNoRightAdministrationError } from '@shared/model';

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
          if (error) {
            reject(new Error('Authorization failed! Please try again'));
          }
          resolve(decoded);
        });
      });
    };

    let decoded: TDecoded = undefined;

    try {
      decoded = await getDecoded();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ResponseError(
          'Authorization failed! Please try again',
          401,
          'FAILED-AUTHORIZATION'
        );
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
