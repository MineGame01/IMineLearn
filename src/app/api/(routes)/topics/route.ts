import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/_model/filters-data-response';
import { ITopic } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { TCategoryId } from '@entities/categories-list';
import { TUserId } from '@entities/User';
import { convertDatesToTimestamps, ResponseParamIsRequiredError } from '@shared/model';

interface IRequestQuery extends IFilterQueryParams {
  search: string | null;
  category_id: TCategoryId | null;
  user_id: TUserId | null;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const searchParams = request.nextUrl.searchParams;

    const { getFilterQueryParams } = new FiltersDataResponse();

    const queryParams: IRequestQuery = {
      search: searchParams.get('search'),
      category_id: searchParams.get('category_id'),
      user_id: searchParams.get('user_id'),
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
      user_id,
    } = queryParams;

    if (!user_id && !category_id)
      throw new ResponseParamIsRequiredError(true, 'user_id', 'category_id');

    const defaultFindOptions: Prisma.topicsFindManyArgs = {
      take: limit_count,
      skip: offset_count,
      orderBy: {
        created_at: 'desc',
      },
      where: {
        category_id: category_id ?? undefined,
        created_at: created_after
          ? { gte: new Date(created_after), lt: new Date(created_before ?? new Date().getTime()) }
          : undefined,
        title: search ? { startsWith: search } : undefined,
        user_id: user_id ?? undefined,
      },
    };

    if (return_ids_only) {
      return NextResponse.json<string[]>(
        (await prisma.topics.findMany({ select: { id: true }, ...defaultFindOptions })).map(
          (topic) => topic.id
        )
      );
    }

    const topics = await prisma.topics.findMany(defaultFindOptions);

    return NextResponse.json<ITopic[]>(convertDatesToTimestamps(topics));
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);
