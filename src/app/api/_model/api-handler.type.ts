/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */
import { NextRequest, NextResponse } from 'next/server';

export type TApiHandler = (
  request: NextRequest
) => NextResponse<unknown> | Promise<NextResponse<unknown> | undefined | void>;
