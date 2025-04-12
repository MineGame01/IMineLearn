import { NextRequest, NextResponse } from 'next/server';
import { TApiHandler } from './api-handler.type';

export const errorCatchingApiHandlerDecorator =
  async (handler: TApiHandler, statusCode?: number) => async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: statusCode ?? 500 });
      } else {
        throw error;
      }
    }
  };
