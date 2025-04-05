import { checkAuthAccessToken } from '@app/api/check-auth-access-token';
import { client } from '@app/api/db';
import { IReport, ReportSchema } from '@entities/Report';
import { NextRequest, NextResponse } from 'next/server';

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
});
