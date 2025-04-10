import { client } from '@app/api/db';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery {
  id: string | null;
}

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: "Query param 'id' is required!" }, { status: 400 });
  }

  const value = await client
    .db('db')
    .collection<{ _id: string; value: string | number | boolean }>('console')
    .findOne({ _id: id });

  if (!value) {
    return NextResponse.json({ message: 'Not found!' }, { status: 404 });
  }

  return NextResponse.json(value.value);
};
