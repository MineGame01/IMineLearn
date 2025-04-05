import { client } from '@app/api/db';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { ITopic } from '@entities/Topic';
import { Filter } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery extends IFilterQueryParams {
  search: string | null;
  category_id: string | null;
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const filters = new FiltersDataResponse();

  const queryParams: IRequestQuery = {
    search: searchParams.get('search'),
    category_id: searchParams.get('category_id'),
    ...filters.getFilterQueryParams(searchParams),
  };

  const { category_id, return_ids_only, created_after, created_before, search } = queryParams;

  if (!category_id) {
    return NextResponse.json(
      { message: 'Param query "category_id" is required!' },
      { status: 400 }
    );
  }

  const findOptionsDefault: Filter<ITopic> = {
    category_id,
    ...(created_after
      ? {
          created_at: { $gte: +created_after, $lt: Number(created_before) ?? new Date().getTime() },
        }
      : {}),
    ...(search ? { title: { $regex: search } } : {}),
  };

  const topicsFind = client
    .db('db')
    .collection<ITopic>('topics')
    .find(findOptionsDefault, filters.defaultFindOptions);

  if (return_ids_only) {
    return NextResponse.json<string[]>(
      await topicsFind
        .project({ _id: 1 })
        .map((topic) => topic._id)
        .toArray()
    );
  }

  return NextResponse.json<ITopic[]>(await topicsFind.toArray());
};
