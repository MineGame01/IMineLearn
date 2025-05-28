import { NextRequest, NextResponse } from 'next/server';
import { THandlerRequest } from './_model/handler-request.type';
import Joi from 'joi';
import { IServerErrorResponse } from '@shared/model';
import { ResponseError } from '@shared/model';

export const withErrorHandlerRequest =
  (handler: THandlerRequest) => async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      console.error('REST API', error);
      if (error instanceof Joi.ValidationError) {
        return NextResponse.json<IServerErrorResponse>({ message: error.message }, { status: 400 });
      } else if (error instanceof ResponseError) {
        return NextResponse.json({ message: error.message }, { status: error.statusCode });
      } else {
        throw error;
      }
    }
  };
