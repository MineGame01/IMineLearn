import { client } from '@app/api/db';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { ICategory } from '@entities/Category';
import { FindOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery
  extends Pick<IFilterQueryParams, 'limit_count' | 'offset_count' | 'return_ids_only'> {
  category_id: string | null;
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { defaultOptions, getFilterQueryParams } = new FiltersDataResponse();

  const queryParams: IRequestQuery = {
    category_id: searchParams.get('category_id'),
    ...getFilterQueryParams(searchParams),
  };

  const { category_id, return_ids_only, offset_count, limit_count } = queryParams;

  const defaultFindOptions: FindOptions = {
    limit: limit_count ?? defaultOptions.limit_count,
    skip: offset_count ?? defaultOptions.offset_count,
  };

  const categoriesCollection = client.db('db').collection<ICategory>('categories');

  if (return_ids_only) {
    const categoriesIds = await categoriesCollection
      .find({}, defaultFindOptions)
      .project({ _id: 1 })
      .map((category) => category._id)
      .toArray();

    return NextResponse.json<string[]>(categoriesIds);
  }

  if (category_id) {
    const categories = await categoriesCollection
      .find({ _id: category_id }, defaultFindOptions)
      .toArray();

    if (categories.length === 0) {
      return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
    } else {
      return NextResponse.json<ICategory>(categories[0]);
    }
  }

  const categories = await categoriesCollection.find({}, defaultFindOptions).toArray();

  return NextResponse.json<ICategory[]>(categories);
};
