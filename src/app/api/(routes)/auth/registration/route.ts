import { NextRequest, NextResponse } from 'next/server';
import { createAccessToken } from '@app/api/_lib/create-access-token';
import { createRefreshToken } from '@app/api/_lib/create-refresh-token';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { getPrisma } from '@app/api/_prisma/get-prisma';

interface IDataRequest {
  email: string | null;
  password: string | null;
  username: string | null;
}

const handler = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const body = (await request.json()) as IDataRequest;

    const { email, password, username } = body;

    const new_user = await prisma.users.registration({ email, password, username });

    return NextResponse.json({
      access_token: createAccessToken(new_user),
      refresh_token: createRefreshToken(new_user.id),
      user_id: new_user.id,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = errorCatchingApiHandlerDecorator(handler, 401);
