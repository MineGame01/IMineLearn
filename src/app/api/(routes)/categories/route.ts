import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/_model/filters-data-response';
import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { ICategory } from '@entities/categories-list';

type TRequestQuery = Pick<IFilterQueryParams, 'limit_count' | 'offset_count' | 'return_ids_only'>;

const handleGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const searchParams = request.nextUrl.searchParams;

    const { getFilterQueryParams, defaultOptions } = new FiltersDataResponse();

    const queryParams: TRequestQuery = {
      ...getFilterQueryParams(searchParams),
    };

    const {
      return_ids_only,
      offset_count = defaultOptions.offset_count,
      limit_count = defaultOptions.limit_count,
    } = queryParams;

    const defaultFindOptions = {
      skip: offset_count,
      take: limit_count,
    };

    if (return_ids_only) {
      const categoriesIds = (
        await prisma.categories.findMany({ ...defaultFindOptions, select: { id: true } })
      ).map((category) => category.id);
      return NextResponse.json(categoriesIds);
    }

    const categories = await prisma.categories.findMany({ ...defaultFindOptions });

    return NextResponse.json<ICategory[]>(
      categories.map((category) => ({
        ...category,
        lastActivity: category.lastActivity
          ? new Date(category.lastActivity).getTime()
          : category.lastActivity,
      }))
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handleGet);
