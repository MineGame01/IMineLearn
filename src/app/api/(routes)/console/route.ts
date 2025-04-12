import { client } from '@app/api/db';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery {
  field: string | null;
}

const handler = async (request: NextRequest) => {
  try {
    await client.connect();
    const field = request.nextUrl.searchParams.get('field');

    if (!field) {
      return NextResponse.json({ message: "Query param 'field' is required!" }, { status: 400 });
    }

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
  } finally {
    await client.close();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(handler);
