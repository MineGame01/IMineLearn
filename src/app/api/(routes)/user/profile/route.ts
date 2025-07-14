import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { TProfileBio, TUserUserName } from '@entities/User';
import {
  responseErrors,
  ResponseParamIsRequiredError,
  ResponseUsernameAlreadyUsedError,
} from '@shared/model';
import { NextRequest, NextResponse } from 'next/server';

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();

    const user_id = request.nextUrl.searchParams.get('user_id');
    const username = request.nextUrl.searchParams.get('username');

    if (!user_id && !username) {
      throw new ResponseParamIsRequiredError(true, 'user_id', 'username');
    }

    const user = await prisma.users.findFirst({
      where: { id: user_id ?? undefined, username: username ?? undefined },
    });
    if (!user) return;

    const profile = await prisma.profiles.findFirst({ where: { user_id: user.id } });

    return NextResponse.json(profile);
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);

interface IDataRequestPut {
  username?: TUserUserName;
  bio?: TProfileBio;
}

const handlerPut = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const data = (await request.json()) as IDataRequestPut;
    const authUser = request.auth;

    if (!authUser) return;

    const { username, bio } = data;

    if (!username && bio === undefined) {
      throw new ResponseParamIsRequiredError(false, 'username', 'bio');
    }

    const user = await prisma.users.findFirst({
      where: { username },
    });
    if (user && user.id !== authUser.id) {
      throw new ResponseUsernameAlreadyUsedError(username);
    }

    const profile = await prisma.profiles.findFirst({ where: { user_id: authUser.id } });
    if (!profile) throw new responseErrors.ResponseUserProfileNotFoundError();

    if (bio !== undefined) {
      await prisma.profiles.update({
        where: { id: profile.id, user_id: authUser.id },
        data: {
          bio,
        },
      });
    }

    if (username) {
      await prisma.users.update({
        where: { id: authUser.id },
        data: {
          username,
        },
      });
    }

    return NextResponse.json({
      username,
      bio,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = withErrorHandlerRequest(checkAuthAccessToken(handlerPut));
