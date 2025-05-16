import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/_model/filters-data-response';
import { IReport, TReportId } from '@entities/Report';
import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@app/api/_prisma/get-prisma';

interface IRequestQuery extends IFilterQueryParams {
  report_id: TReportId | null;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const authUser = request.auth;
    if (!authUser) {
      return;
    }

    const { is_admin } = authUser;

    if (!is_admin) {
      return NextResponse.json(
        { message: 'You have no right of administration!' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { getFilterQueryParams } = new FiltersDataResponse();

    const queryParams: IRequestQuery = {
      report_id: searchParams.get('report_id'),
      ...getFilterQueryParams(searchParams),
    };

    const { return_ids_only, created_after, created_before, limit_count, offset_count, report_id } =
      queryParams;

    const find = created_after
      ? { created_at: { gte: +created_after, lt: +(created_before ?? new Date().getTime()) } }
      : {};

    const find_options = {
      take: limit_count,
      skip: offset_count,
    };

    if (return_ids_only) {
      return NextResponse.json<string[]>(
        (await prisma.reports.findMany({ where: find, ...find_options, select: { id: true } })).map(
          (report) => report.id
        )
      );
    }

    if (report_id) {
      const report = await prisma.reports.findFirst({ where: { ...find, id: report_id } });

      if (!report) {
        return NextResponse.json({ message: 'Report not found!' }, { status: 404 });
      } else {
        return NextResponse.json<IReport>(report);
      }
    }

    return NextResponse.json<IReport[]>(
      await prisma.reports.findMany({ where: find, ...find_options })
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(await checkAuthAccessToken(handlerGet));

type TDataRequestPost = Pick<IReport, 'target_id' | 'content' | 'reason' | 'target_type'>;

const handlerPost = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const body = (await request.json()) as TDataRequestPost;
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { id: auth_user_id } = authUser;

    const { target_id, content, reason, target_type } = body;

    if (!target_id) {
      return NextResponse.json({ message: 'Query param target_id is required!' }, { status: 400 });
    }

    const report = await prisma.reports.findFirst({ where: { target_id, user_id: auth_user_id } });

    if (report) {
      return NextResponse.json(
        { message: 'This content has already been reported.' },
        { status: 400 }
      );
    }

    await prisma.reports.create({
      data: { content, target_id, user_id: auth_user_id, reason, target_type },
    });

    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = await errorCatchingApiHandlerDecorator(await checkAuthAccessToken(handlerPost));

interface IDataRequestDelete {
  report_id: TReportId | null;
}

const handlerDelete = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const data = (await request.json()) as IDataRequestDelete;
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    if (!authUser.is_admin) {
      return NextResponse.json(
        { message: 'You have no right of administration!' },
        { status: 403 }
      );
    }

    const { report_id } = data;

    if (!report_id) {
      return NextResponse.json({ message: 'report_id is required!' }, { status: 400 });
    }

    await prisma.reports.delete({ where: { id: report_id } });
    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = await errorCatchingApiHandlerDecorator(
  await checkAuthAccessToken(handlerDelete)
);
