import { ResponseError } from './response-error';

export class ResponseTokenExpiredError extends ResponseError {
  constructor(type: 'access' | 'refresh' = 'access') {
    super(`Expired ${type} token!`, 401, `EXPRIRED-${type.toUpperCase()}-TOKEN`);
  }
}
