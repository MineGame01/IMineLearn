import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { TUserBio, TUserId, TUserUserName } from '@entities/User';
import { ParamIsRequiredError, UsernameAlreadyUsedError, UserNotFoundError } from '@shared/api';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery {
  user_id: TUserId | null;
  username: TUserUserName | null;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const searchParams = request.nextUrl.searchParams;

    const queryParams: IRequestQuery = {
      user_id: searchParams.get('user_id'),
      username: searchParams.get('username'),
    };

    const { user_id, username } = queryParams;

    if (!user_id && !username) {
      return new ParamIsRequiredError(true, 'user_id', 'username');
    }

    const user = await prisma.users.findFirst({
      where: { id: user_id ?? undefined, username: username ?? undefined },
    });

    if (user) {
      return NextResponse.json({
        ...user,
        hash_password: null,
        salt: null,
      });
    } else {
      throw new UserNotFoundError(username ?? undefined);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);

interface IDataRequestPut {
  username?: TUserUserName;
  bio?: TUserBio;
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
      throw new ParamIsRequiredError(false, 'username', 'bio');
    }

    const user = await prisma.users.findFirst({
      where: { username },
    });
    if (user && user.id !== authUser.id) {
      throw new UsernameAlreadyUsedError(username);
    }

    const updated_data = await prisma.users.update({
      where: { id: authUser.id },
      data: {
        username: username,
        bio: bio,
      },
    });
    return NextResponse.json({
      username: updated_data.username,
      bio: updated_data.bio,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = withErrorHandlerRequest(checkAuthAccessToken(handlerPut));
