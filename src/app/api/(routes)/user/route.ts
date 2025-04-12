import { client } from '@app/api/db';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { IUser } from '@entities/User';
import { NextRequest, NextResponse } from 'next/server';

const handlerGet = async (request: NextRequest) => {
  try {
    await client.connect();
    const searchParams = request.nextUrl.searchParams;

    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ message: 'Query params user_id is required!' }, { status: 400 });
    }

    const user = await client.db('db').collection<IUser>('users').findOne({ _id: user_id });

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
    await client.close();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(handlerGet);
