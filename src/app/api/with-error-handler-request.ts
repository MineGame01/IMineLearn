import { NextRequest, NextResponse } from 'next/server';
import { THandlerRequest } from './_model/handler-request.type';
import Joi from 'joi';
import { ResponseError, ResponseValidationError } from '@shared/model';
import { checkResponseTokenError } from '@shared/api';

export const withErrorHandlerRequest =
  (handler: THandlerRequest) => async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        const { message, code, statusCode } = new ResponseValidationError(error);
        return NextResponse.json({ message, code, statusCode }, { status: statusCode });
      } else if (error instanceof ResponseError) {
        const { message, statusCode, code } = error;

        if (checkResponseTokenError(error, 'refresh')) {
          const response = NextResponse.json({ message, statusCode, code }, { status: statusCode });
          response.cookies.delete('refresh_token');
          return response;
        }

        return NextResponse.json({ message, statusCode, code }, { status: statusCode });
      } else {
        throw error;
      }
    }
  };
