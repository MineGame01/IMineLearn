import { getPrisma } from '@app/api/_prisma/get-prisma';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { IUser, TUserId, TUserUserName } from '@entities/User';
import {
  convertDatesToTimestamps,
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

    if (!user_id && !username) throw new ResponseParamIsRequiredError(true, 'user_id', 'username');

    const user = await prisma.users.findFirst({
      where: { id: user_id ?? undefined, username: username ?? undefined },
    });
    if (!user) throw new ResponseUserNotFoundError(username);

    return NextResponse.json<Omit<IUser, 'hash_password' | 'salt'>>(
      convertDatesToTimestamps([
        removeUndefinedKey({
          ...user,
          hash_password: undefined,
          salt: undefined,
        }),
      ])[0]
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);
