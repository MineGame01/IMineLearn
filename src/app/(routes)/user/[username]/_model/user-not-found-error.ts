import { PageError } from '@shared/model';

export class UserNotFoundError extends PageError {
  constructor(message?: string) {
    super('USER-NOT-FOUND', message);
  }
}
