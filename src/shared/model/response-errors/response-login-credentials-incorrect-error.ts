import { ResponseError } from './response-error';

export class ResponseLoginCredentialsIncorrectError extends ResponseError {
  constructor() {
    super('Email or password is incorrect!', 401, 'LOGIN-CREDENTIALS-INCORRECT');
  }
}
