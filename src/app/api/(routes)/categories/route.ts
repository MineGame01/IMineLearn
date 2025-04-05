import { client } from '@app/api/db';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { ICategory } from '@entities/Category';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery
  extends Pick<IFilterQueryParams, 'limit_count' | 'offset_count' | 'return_ids_only'> {
  category_id: string | null;
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const filters = new FiltersDataResponse();

  const queryParams: IRequestQuery = {
    category_id: searchParams.get('category_id'),
    ...filters.getFilterQueryParams(searchParams),
  };

  const { category_id, return_ids_only } = queryParams;

  const categoriesCollection = client.db('db').collection<ICategory>('categories');

  if (return_ids_only) {
    const categoriesIds = await categoriesCollection
      .find({}, filters.defaultFindOptions)
      .project({ _id: 1 })
      .map((category) => category._id)
      .toArray();

    return NextResponse.json<string[]>(categoriesIds);
  }

  if (category_id) {
    const categories = await categoriesCollection
      .find({ _id: category_id }, filters.defaultFindOptions)
      .toArray();

    if (categories.length === 0) {
      return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
    } else {
      return NextResponse.json<ICategory>(categories[0]);
    }
  }

  const categories = await categoriesCollection.find({}, filters.defaultFindOptions).toArray();

  return NextResponse.json<ICategory[]>(categories);
};
