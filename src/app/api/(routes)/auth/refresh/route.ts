import { NextRequest, NextResponse } from 'next/server';
import { createAccessToken } from '@app/api/_lib/create-access-token';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import {
  ResponseTokenExpiredError,
  ResponseParamIsRequiredError,
  ResponseTokenError,
  ResponseUserNotFoundError,
  responseErrors,
} from '@shared/model';
import { RefreshTokenVerify } from '@app/api/_lib/refresh-token-verify';
import jwt from 'jsonwebtoken';

const handler = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();

    const refresh_token = request.cookies.get('refresh_token')?.value;

    if (!refresh_token) {
      throw new ResponseParamIsRequiredError(false, 'refresh_token');
    }

    try {
      const verify_refresh_token = await RefreshTokenVerify(refresh_token);

      if (!verify_refresh_token) {
        throw new ResponseTokenError('refresh');
      }

      const user = await prisma.users.findFirst({ where: { id: verify_refresh_token.user_id } });
      if (!user) throw new ResponseUserNotFoundError();

      const profile = await prisma.profiles.findFirst({ where: { user_id: user.id } });
      if (!profile) throw new responseErrors.ResponseUserProfileNotFoundError();

      return NextResponse.json({
        access_token: createAccessToken({ ...user, is_admin: profile.is_admin }),
        user_id: user.id,
      });
    } catch (error: unknown) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ResponseTokenError('refresh');
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new ResponseTokenExpiredError('refresh');
      } else {
        throw error;
      }
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = withErrorHandlerRequest(handler);
