import { NextRequest, NextResponse } from 'next/server';
import { createAccessToken } from '@app/api/_lib/create-access-token';
import { createRefreshToken } from '@app/api/_lib/create-refresh-token';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { setRefreshTokenCookie } from '@app/api/_lib/set-refresh-token-cookie';

interface IDataRequest {
  email: string | null;
  password: string | null;
}

const handler = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();

    const user = await request.json().then((body) => prisma.users.login(body as IDataRequest));
    const user_id = user.id;

    const response = NextResponse.json({
      access_token: createAccessToken({ ...user, is_admin: user.is_admin }),
      user_id,
    });

    setRefreshTokenCookie(response, createRefreshToken(user_id));

    return response;
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = withErrorHandlerRequest(handler);
