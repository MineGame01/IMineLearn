/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextRequest, NextResponse } from 'next/server';

export type THandlerRequest = (
  request: NextRequest
) => NextResponse | Promise<NextResponse | undefined | void>;
