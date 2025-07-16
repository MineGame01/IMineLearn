import { PageError } from '@shared/model';

export class FailedLoadingUserTopicsError extends PageError {
  constructor(message?: string) {
    super('FAILED-LOADING-USER-TOPIC', message);
  }
}
