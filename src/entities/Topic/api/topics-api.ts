import { appApi } from '@app/api';
import { ITopicsEndpointsApi } from './topics-endpoints-api.type';
import { getResponseError } from '@shared/model';
import { commentsApiEndpoints } from './comments-api-endpoints';

export const topicsApi: ITopicsEndpointsApi = {
  async getTopicById(topic_id) {
    try {
      return await appApi.get('topic', { searchParams: { topic_id } }).then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed loading topic!',
        statusCode: 500,
        code: 'FAILED-LOADING-TOPIC',
      });
    }
  },
  async getTopics(body) {
    try {
      return await appApi.get('topics', { searchParams: body }).then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed loading topics!',
        statusCode: 500,
        code: 'FAILED-LOADING-TOPICS',
      });
    }
  },
  async deleteTopic(body) {
    try {
      return await appApi.delete('topic', { json: body }).then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed deleting topic!',
        statusCode: 500,
        code: 'FAILED-DELETING-TOPIC',
      });
    }
  },
  async createTopic(body) {
    try {
      return await appApi.post('topic', { json: body }).then((res) => res.json());
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed create topic!',
        statusCode: 500,
        code: 'FAILED-CREATE-TOPIC',
      });
    }
  },
  async getTopicByIdAndComments(
    this: ITopicsEndpointsApi,
    { topic_id, ...getCommentsByTopicIdArgs }
  ) {
    const [topic, comments] = await Promise.all([
      this.getTopicById(topic_id),
      commentsApiEndpoints.getCommentsByTopicId({ topic_id, ...getCommentsByTopicIdArgs }),
    ]);
    return { ...topic, comments };
  },
};
