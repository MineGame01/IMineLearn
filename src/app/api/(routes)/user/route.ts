import { getPrisma } from '@app/api/_prisma/get-prisma';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { TUserId } from '@entities/User';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery {
  user_id: TUserId | undefined;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const searchParams = request.nextUrl.searchParams;

    const user_id = searchParams.get('user_id') as IRequestQuery['user_id'];

    if (!user_id) {
      return NextResponse.json({ message: 'Query params user_id is required!' }, { status: 400 });
    }

    const user = await prisma.users.findFirst({ where: { id: user_id } });

    if (user) {
      return NextResponse.json({
        ...user,
        hash_password: null,
        salt: null,
      });
    } else {
      return NextResponse.json({ message: 'User not found!' }, { status: 400 });
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = errorCatchingApiHandlerDecorator(handlerGet);
