import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/_model/filters-data-response';
import { ITopic } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { getPrisma } from '@app/api/_prisma/get-prisma';

interface IRequestQuery extends IFilterQueryParams {
  search: string | null;
  category_id: string | null;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const searchParams = request.nextUrl.searchParams;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { getFilterQueryParams } = new FiltersDataResponse();

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

    const defaultFindOptions: Prisma.topicsFindManyArgs = {
      take: limit_count,
      skip: offset_count,
      orderBy: {
        created_at: 'desc',
      },
      where: {
        category_id,
        ...(created_after
          ? { created_at: { gte: +created_after, lt: +(created_before ?? new Date().getTime()) } }
          : {}),
        ...(search ? { title: { startsWith: search } } : {}),
      },
    };

    if (return_ids_only) {
      return NextResponse.json<string[]>(
        (await prisma.topics.findMany({ select: { id: true }, ...defaultFindOptions })).map(
          (topic) => topic.id
        )
      );
    }

    return NextResponse.json<ITopic[]>(await prisma.topics.findMany(defaultFindOptions));
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = errorCatchingApiHandlerDecorator(handlerGet);
