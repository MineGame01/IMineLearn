import { client } from '@app/api/db';
import { IUser } from '@entities/User';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
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
};
