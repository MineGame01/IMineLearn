import { ResponseError } from './response-error';

export const responseErrors = {
  ResponseUserProfileNotFoundError: class extends ResponseError {
    constructor() {
      super('User profile not found!', 404, 'USER-PROFILE-NOT-FOUND');
    }
  },
  ResponseCommentNotFoundError: class extends ResponseError {
    constructor() {
      super('Comment not found!', 404, 'COMMENT-NOT-FOUND');
    }
  },
  ResponseCategoryNotFoundError: class extends ResponseError {
    constructor() {
      super('Category not found!', 404, 'CATEGORY-NOT-FOUND');
    }
  },
  ResponseTopicNotFoundError: class extends ResponseError {
    constructor() {
      super('Topic not found!', 404, 'TOPIC-NOT-FOUND');
    }
  },
};
