import { checkAuthAccessToken } from '@app/api/check-auth-access-token';
import { client } from '@app/api/db';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { IReport, ReportSchema } from '@entities/Report';
import { Filter, FindOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery extends IFilterQueryParams {
  report_id: IReport['_id'] | null;
}

export const GET = await checkAuthAccessToken(async (request: NextRequest) => {
  const authUser = request.auth;
  if (!authUser) {
    return;
  }

  const { is_admin } = authUser;

  if (!is_admin) {
    return NextResponse.json({ message: 'You have no right of administration!' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const { getFilterQueryParams } = new FiltersDataResponse();

  const queryParams: IRequestQuery = {
    report_id: searchParams.get('report_id'),
    ...getFilterQueryParams(searchParams),
  };

  const { return_ids_only, created_after, created_before, limit_count, offset_count, report_id } =
    queryParams;

  const reportsCollection = client.db('db').collection<IReport>('reports');

  const reportsDefaultFind: Filter<IReport> = created_after
    ? { created_at: { $gte: +created_after, $lt: +(created_before ?? new Date().getTime()) } }
    : {};
  const reportsDefaultFindOptions: FindOptions = {
    limit: limit_count,
    skip: offset_count,
  };

  try {
    if (return_ids_only) {
      return NextResponse.json(
        await reportsCollection
          .find(reportsDefaultFind, reportsDefaultFindOptions)
          .map((report) => report._id)
          .toArray()
      );
    }

    if (report_id) {
      return NextResponse.json(
        await reportsCollection
          .find({ ...reportsDefaultFind, _id: report_id }, reportsDefaultFindOptions)
          .toArray()
      );
    }

    return NextResponse.json(
      await reportsCollection.find(reportsDefaultFind, reportsDefaultFindOptions).toArray()
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      throw error;
    }
  }
});

interface IDataRequest extends Pick<IReport, 'content' | 'reason' | 'target_id' | 'target_type'> {}

export const POST = await checkAuthAccessToken(async (request: NextRequest) => {
  const body = await request.json();
  const authUser = request.auth;

  if (!authUser) {
    return;
  }

  const { _id: user_id } = authUser;

  const { target_id } = body as IDataRequest;

  if (!target_id) {
    return NextResponse.json({ message: 'Query param target_id is required!' }, { status: 400 });
  }

  const reportCollection = client.db('db').collection<IReport>('reports');

  try {
    const report = await reportCollection.findOne({ target_id, user_id });

    if (report) {
      return NextResponse.json(
        { message: 'This content has already been reported.' },
        { status: 400 }
      );
    }

    const { error, warning, value: reportValidate } = ReportSchema.validate({ ...body, user_id });

    if (error || warning) {
      return NextResponse.json({ message: error?.message ?? warning?.message }, { status: 400 });
    }

    await reportCollection.insertOne(reportValidate as IReport);
    return NextResponse.json(null);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      throw error;
    }
  }
});

interface IDataRequest {
  report_id: IReport['_id'] | null;
}

export const DELETE = await checkAuthAccessToken(async (request: NextRequest) => {
  const data = await request.json();
  const authUser = request.auth;

  if (!authUser) {
    return;
  }

  const { report_id } = data as IDataRequest;

  if (!report_id) {
    return NextResponse.json({ message: 'report_id is required!' }, { status: 400 });
  }

  try {
    await client.db('db').collection<IReport>('reports').deleteOne({ _id: report_id });
    return NextResponse.json(null);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      throw error;
    }
  }
});
