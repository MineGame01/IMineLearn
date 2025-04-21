import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getClient } from '@app/api/db';
import { createAccessToken } from '@app/api/_lib/create-access-token';
import { IUser } from '@entities/User';
import { getEnvVar } from '@shared/lib';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';

interface IDataRequest {
  refresh_token: string;
}

const errorStatusCode = 401;

const handler = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const body = await request.json();

    const { refresh_token } = body as IDataRequest;

    if (!refresh_token) {
      return NextResponse.json({ message: 'Refresh token not found!' }, { status: 401 });
    }

    const jwtPayload = async () => {
      return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
        jwt.verify(
          refresh_token,
          getEnvVar('PRIVATE_KEY_JWT') as string,
          async (error, jwtPayload) => {
            if (error) reject(error);
            else resolve(jwtPayload);
          }
        );
      });
    };

    const loginCredentials = await jwtPayload();

    if (loginCredentials && typeof loginCredentials === 'object') {
      if ('user_id' in loginCredentials) {
        if (typeof loginCredentials.user_id === 'string') {
          const user = await client.db('db').collection<IUser>('users').findOne({
            _id: loginCredentials.user_id,
          });

          if (!user) {
            return NextResponse.json({ message: 'User not found!' }, { status: 401 });
          }

          return NextResponse.json({
            access_token: createAccessToken({ ...user, _id: user._id }),
            user_id: user._id,
          });
        } else {
          return NextResponse.json({ message: 'Refresh token is wrong!' }, { status: 401 });
        }
      }
    } else {
      return NextResponse.json({ message: 'Refresh token is wrong!' }, { status: 401 });
    }
  } finally {
    await client.close();
  }
};

export const POST = await errorCatchingApiHandlerDecorator(handler, errorStatusCode);
