import { PageError } from '@shared/model';

export class FailedLoadingCategoryPageError extends PageError {
  constructor(message?: string) {
    super('FAILED-LOADING-CATEGORY', message);
  }
}
