import { ResponseTokenExpiredError, ResponseTokenError, ResponseError } from '@shared/model';

export const checkResponseTokenError = (error: unknown, type: 'access' | 'refresh' = 'access') => {
  return (
    error instanceof ResponseError &&
    (error.code === new ResponseTokenExpiredError(type).code ||
      error.code === new ResponseTokenError(type).code)
  );
};
