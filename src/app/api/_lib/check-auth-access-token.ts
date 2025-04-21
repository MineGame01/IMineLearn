import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { IUser } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import { TApiHandler } from '../_model/api-handler.type';

export const checkAuthAccessToken = async (handler: TApiHandler) => {
  return async (request: NextRequest) => {
    const authorization: string | null = request.headers.get('authorization');

    if (!authorization) {
      return NextResponse.json({ message: 'Request not authorized!' }, { status: 401 });
    }

    try {
      return jwt.verify(authorization, getEnvVar('PRIVATE_KEY_JWT'), async (error, decoded) => {
        if (error) {
          return NextResponse.json(
            { message: 'Authorization failed! Please try again' },
            { status: 500 }
          );
        }

        if (decoded && typeof decoded === 'object') {
          request.auth = decoded as IUser;
          return await handler(request);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
      } else {
        throw error;
      }
    }
  };
};
