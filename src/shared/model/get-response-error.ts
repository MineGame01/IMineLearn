import { HTTPError } from 'ky';
import { ResponseError } from './response-errors/response-error';
import { IResponseError } from './response-errors/response-error.type';

export const getResponseError = (
  error: unknown,
  defaultResponseError: Pick<IResponseError, 'message' | 'code' | 'statusCode'>
) => {
  console.error(error);
  // If the server has the correct answer, then we rethrow the error
  if (error instanceof HTTPError && error.cause instanceof ResponseError) {
    return error.cause;
  } else {
    const { code, message, statusCode } = defaultResponseError;
    // Default error for this endpoint
    // Throws if the server did not return a response or an unknown error structure.
    return new ResponseError(
      message,
      error instanceof HTTPError ? error.response.status : statusCode,
      code,
      error
    );
  }
};
