import { getClient } from '@app/api/db';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { ITopic } from '@entities/Topic';
import { Filter, FindOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery extends IFilterQueryParams {
  search: string | null;
  category_id: string | null;
}

const handlerGet = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const searchParams = request.nextUrl.searchParams;

    const { getFilterQueryParams, defaultOptions } = new FiltersDataResponse();

    const queryParams: IRequestQuery = {
      search: searchParams.get('search'),
      category_id: searchParams.get('category_id'),
      ...getFilterQueryParams(searchParams),
    };

    const {
      category_id,
      return_ids_only,
      created_after,
      created_before,
      search,
      limit_count,
      offset_count,
    } = queryParams;

    if (!category_id) {
      return NextResponse.json(
        { message: 'Param query "category_id" is required!' },
        { status: 400 }
      );
    }

    const defaultFind: Filter<ITopic> = {
      ...(created_after
        ? { created_at: { $gte: +created_after, $lt: +(created_before ?? new Date().getTime()) } }
        : {}),
      category_id,
      ...(search ? { title: { $regex: search } } : {}),
    };
    const defaultFindOptions: FindOptions = {
      limit: limit_count ?? defaultOptions.limit_count,
      skip: offset_count ?? defaultOptions.offset_count,
    };

    const topicsFind = client
      .db('db')
      .collection<ITopic>('topics')
      .find(defaultFind, defaultFindOptions);

    if (return_ids_only) {
      return NextResponse.json<string[]>(
        await topicsFind
          .project({ _id: 1 })
          .map((topic) => topic._id)
          .toArray()
      );
    }

    return NextResponse.json<ITopic[]>(await topicsFind.toArray());
  } finally {
    await client.close();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(handlerGet);
