import { ResponseError } from './response-error';

export class ResponseRefreshTokenWrongError extends ResponseError {
  constructor() {
    super('Refresh token is wrong!', 401, 'REFRESH-TOKEN-WRONG');
  }
}
