import { ResponseError } from '@shared/api';

export class UserNotFoundError extends ResponseError {
  constructor(username?: string) {
    super(`User ${username ? `'${username}'` : ''} not found!`, 404, 'USER-NOT-FOUND');
  }
}
