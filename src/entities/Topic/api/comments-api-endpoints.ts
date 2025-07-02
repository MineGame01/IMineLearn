import { appApi } from '@app/api';
import {
  ICommentsEndpointsApiQueries,
  ICommentsEndpointsApiMutation,
} from './comments-endpoints-api.type';
import { getResponseError } from '@shared/model';

export const commentsApiEndpoints: ICommentsEndpointsApiQueries & ICommentsEndpointsApiMutation = {
  async getCommentById(comment_id) {
    try {
      return await appApi
        .get('comment', {
          searchParams: { comment_id },
          next: { tags: ['topic-comment', comment_id] },
        })
        .then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed getting topic comment!',
        statusCode: 500,
        code: 'FAILED-GETTING-TOPIC-COMMENT',
      });
    }
  },
  async getCommentsByTopicId(body) {
    try {
      return await appApi
        .get('comments', {
          searchParams: body,
          next: { tags: ['topic-comments', body.topic_id] },
        })
        .then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed getting topic comments!',
        statusCode: 500,
        code: 'FAILED-GETTING-TOPIC-COMMENTS',
      });
    }
  },
  async createComment(body) {
    try {
      return await appApi.post('comments', { json: body }).then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed creating topic comment!',
        statusCode: 500,
        code: 'FAILED-CREATING-TOPIC-COMMENT',
      });
    }
  },
  async deleteComment(comment_id) {
    try {
      return await appApi.delete('comment', { json: { comment_id } }).then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed deleting topic comment!',
        statusCode: 500,
        code: 'FAILED-DELETING-TOPIC-COMMENT',
      });
    }
  },
};
