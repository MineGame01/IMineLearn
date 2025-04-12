import { NextRequest, NextResponse } from 'next/server';

export type TApiHandler = (
  request: NextRequest
) => NextResponse<any> | Promise<NextResponse<any> | undefined | void>;
