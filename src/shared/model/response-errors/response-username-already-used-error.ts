import { ResponseError } from './response-error';

export class ResponseUsernameAlreadyUsedError extends ResponseError {
  constructor(username?: string) {
    super(
      `Username ${username ? `'${username}'` : ''} already in use!`,
      409,
      'USERNAME-ALREADY-USED'
    );
  }
}
