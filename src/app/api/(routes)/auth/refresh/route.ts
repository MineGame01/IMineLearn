import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '@app/api/_lib/create-access-token';
import { getEnvVar } from '@shared/lib';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { IServerErrorResponse } from '@shared/model';

interface IDataRequest {
  refresh_token: string | null;
}

const handler = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const body = (await request.json()) as IDataRequest;

    const { refresh_token } = body;

    if (!refresh_token) {
      return NextResponse.json({ message: 'Refresh token not found!' }, { status: 401 });
    }

    const jwtVerify = async (refresh_token: NonNullable<IDataRequest['refresh_token']>) => {
      return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
        jwt.verify(refresh_token, getEnvVar('PRIVATE_KEY_JWT'), (error, jwtPayload) => {
          if (error) reject(error);
          else resolve(jwtPayload);
        });
      });
    };

    const login_credentials = await jwtVerify(refresh_token);

    if (login_credentials && typeof login_credentials === 'object') {
      if ('user_id' in login_credentials) {
        if (typeof login_credentials.user_id === 'string') {
          const user = await prisma.users.findFirst({ where: { id: login_credentials.user_id } });

          if (!user) {
            return NextResponse.json<IServerErrorResponse>(
              { message: 'User not found!' },
              { status: 401 }
            );
          }

          return NextResponse.json({
            access_token: createAccessToken({ ...user, id: user.id }),
            user_id: user.id,
          });
        } else {
          return NextResponse.json<IServerErrorResponse>(
            { message: 'Refresh token is wrong!' },
            { status: 401 }
          );
        }
      }
    } else {
      return NextResponse.json<IServerErrorResponse>(
        { message: 'Refresh token is wrong!' },
        { status: 401 }
      );
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = withErrorHandlerRequest(handler, 401);
