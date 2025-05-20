/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */
import { ResponseError } from '@shared/api';
import { NextRequest, NextResponse } from 'next/server';

export type THandlerRequest = (
  request: NextRequest
) =>
  | NextResponse<unknown>
  | Promise<NextResponse<unknown> | undefined | void | ResponseError>
  | ResponseError;
