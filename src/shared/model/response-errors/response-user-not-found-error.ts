import { ResponseError } from '@shared/model';

export class ResponseUserNotFoundError extends ResponseError {
  constructor(username?: string | null) {
    super(`User ${username ? `'${username}'` : ''} not found!`, 404, 'USER-NOT-FOUND');
  }
}
