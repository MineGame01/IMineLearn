import { NextRequest, NextResponse } from 'next/server';
import { createAccessToken } from '@app/api/_lib/create-access-token';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import {
  ResponseParamIsRequiredError,
  ResponseRefreshTokenWrongError,
  ResponseUserNotFoundError,
} from '@shared/model';
import { RefreshTokenVerify } from '@app/api/_lib/refresh-token-verify';
import { RefreshToken } from '@app/api/_model/refresh-token';

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
      throw new ResponseParamIsRequiredError(false, 'refresh_token');
    }

    const verify_refresh_token = await RefreshTokenVerify(refresh_token);

    if (!verify_refresh_token || !(verify_refresh_token instanceof RefreshToken)) {
      throw new ResponseRefreshTokenWrongError();
    }

    const user = await prisma.users.findFirst({ where: { id: verify_refresh_token.user_id } });

    if (!user) {
      throw new ResponseUserNotFoundError();
    }

    return NextResponse.json({
      access_token: createAccessToken({ ...user, id: user.id }),
      user_id: user.id,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = withErrorHandlerRequest(handler);
