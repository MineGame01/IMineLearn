import { getPrisma } from '@app/api/_prisma/get-prisma';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { TUserId, TUserUserName } from '@entities/User';
import {
  removeUndefinedKey,
  ResponseParamIsRequiredError,
  ResponseUserNotFoundError,
} from '@shared/model';
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
      return new ResponseParamIsRequiredError(true, 'user_id', 'username');
    }

    const user = await prisma.users.findFirst({
      where: { id: user_id ?? undefined, username: username ?? undefined },
    });

    if (user) {
      return NextResponse.json(
        removeUndefinedKey({
          ...user,
          hash_password: undefined,
          salt: undefined,
        })
      );
    } else {
      throw new ResponseUserNotFoundError(username);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);
