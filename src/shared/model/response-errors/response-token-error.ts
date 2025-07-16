import { ResponseError } from './response-error';

export class ResponseTokenError extends ResponseError {
  constructor(type: 'access' | 'refresh' = 'access') {
    super(`Wrong ${type} token!`, 401, `WRONG-${type.toUpperCase()}-TOKEN`);
  }
}
