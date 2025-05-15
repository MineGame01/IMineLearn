import { NextRequest, NextResponse } from 'next/server';
import { TApiHandler } from './_model/api-handler.type';
import Joi from 'joi';
import { IServerErrorResponse } from '@shared/model';

export const errorCatchingApiHandlerDecorator =
  (handler: TApiHandler, statusCode?: number) => async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return NextResponse.json<IServerErrorResponse>({ message: error.message }, { status: 400 });
      } else if (error instanceof Error) {
        return NextResponse.json<IServerErrorResponse>(
          { message: error.message },
          { status: statusCode ?? 500 }
        );
      } else {
        throw error;
      }
    }
  };
