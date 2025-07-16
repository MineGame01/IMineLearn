import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '@shared/lib';
import { THandlerRequest } from '../_model/handler-request.type';
import {
  ResponseError,
  ResponseNoRightAdministrationError,
  ResponseTokenError,
  ResponseTokenExpiredError,
} from '@shared/model';
import { getPrisma } from '../_prisma/get-prisma';
import { IAccessToken } from '../_model/access-token.type';

type TDecoded = string | jwt.JwtPayload | undefined;

export const checkAuthAccessToken = (handler: THandlerRequest, is_admin?: boolean) => {
  return async (request: NextRequest) => {
    const prisma = getPrisma();
    try {
      const access_token: string | null = request.headers.get('Authorization');

      if (!access_token) {
        throw new ResponseError('Request not authorized!', 401, 'REQUEST-NOT-AUTHORIZED');
      }

      const getDecoded = async () => {
        return new Promise<TDecoded>((resolve, reject) => {
          jwt.verify(access_token, getEnvVar('PRIVATE_KEY_JWT'), (error, decoded) => {
            if (error) reject(error);
            resolve(decoded);
          });
        });
      };

      let decoded: IAccessToken | null = null;

      try {
        decoded = (await getDecoded()) as IAccessToken | null;
      } catch (error: unknown) {
        if (error instanceof jwt.JsonWebTokenError) {
          throw new ResponseTokenError();
        } else if (error instanceof jwt.TokenExpiredError) {
          throw new ResponseTokenExpiredError();
        } else {
          throw error;
        }
      }

      if (decoded) {
        request.auth = decoded;

        const profile = await prisma.profiles.findFirst({ where: { user_id: decoded.id } });

        if (is_admin && !profile?.is_admin) {
          throw new ResponseNoRightAdministrationError();
        }
        return await handler(request);
      }
    } finally {
      await prisma.$disconnect();
    }
  };
};
