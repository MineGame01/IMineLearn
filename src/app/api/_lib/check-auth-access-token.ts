import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { IUser } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import { TApiHandler } from '../_model/api-handler.type';

export const checkAuthAccessToken = (handler: TApiHandler) => {
  return async (request: NextRequest) => {
    const authorization: string | null = request.headers.get('Authorization');

    if (!authorization) {
      return NextResponse.json({ message: 'Request not authorized!' }, { status: 401 });
    }

    try {
      const getDecoded = async () => {
        return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
          jwt.verify(authorization, getEnvVar('PRIVATE_KEY_JWT'), (error, decoded) => {
            if (error) {
              reject(new Error('Authorization failed! Please try again'));
            }
            resolve(decoded);
          });
        });
      };

      const decoded = await getDecoded();

      if (decoded && typeof decoded === 'object') {
        request.auth = decoded as IUser;
        return await handler(request);
      }
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
      } else {
        throw error;
      }
    }
  };
};
