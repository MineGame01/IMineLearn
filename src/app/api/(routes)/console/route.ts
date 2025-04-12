import { client } from '@app/api/db';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery {
  field: string | null;
}

export const GET = async (request: NextRequest) => {
  const field = request.nextUrl.searchParams.get('field');

  if (!field) {
    return NextResponse.json({ message: "Query param 'field' is required!" }, { status: 400 });
  }

  try {
    const document = await client
      .db('db')
      .collection<{ _id: string; [key: string]: string | number | boolean }>('console')
      .find()
      .toArray();

    const fieldValue = document[0][field];

    if (!(field in document[0])) {
      return NextResponse.json({ message: 'Not found!' }, { status: 404 });
    }

    return NextResponse.json(fieldValue);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      throw error;
    }
  }
};
