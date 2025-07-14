import { ResponseError } from './response-error';

export const responseErrors = {
  ResponseUserProfileNotFoundError: class extends ResponseError {
    constructor() {
      super('User profile not found!', 404, 'USER-PROFILE-NOT-FOUND');
    }
  },
};
