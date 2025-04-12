import { client } from '@app/api/db';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { ICategory } from '@entities/Category';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery {
  category_id: ICategory['_id'] | null;
}

const handler = async (request: NextRequest) => {
  const queryParams: IRequestQuery = {
    category_id: request.nextUrl.searchParams.get('category_id'),
  };

  const { category_id } = queryParams;

  if (!category_id) {
    return NextResponse.json({ message: 'Query param category_id is required!' }, { status: 400 });
  }

  const category = await client
    .db('db')
    .collection<ICategory>('categories')
    .findOne({ _id: category_id });

  if (!category) {
    return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
  }

  return NextResponse.json<ICategory>(category);
};

export const GET = await errorCatchingApiHandlerDecorator(handler);
