import { appApi } from '@app/api';
import { TUserEndpointsApi } from './user-api-endpoints.type';
import { getResponseError } from '@shared/model';
import { profileEndpointsApi } from '@entities/User/profile/api/profile-api-endpoints';

const USER_ENDPOINT_URL = 'user';

export const userEndpointsApi: TUserEndpointsApi = {
  async getUser(payload) {
    try {
      return await appApi
        .get(USER_ENDPOINT_URL, {
          searchParams: payload,
          next: { tags: ['user', payload.user_id ?? payload.username ?? ''] },
        })
        .json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed loading user!',
        statusCode: 500,
        code: 'FAILED-LOADING-USER',
      });
    }
  },
  async getUserAndProfile(this: typeof userEndpointsApi, payload) {
    try {
      const fetchUser = this.getUser(payload);
      const fetchProfile = profileEndpointsApi.getProfile(payload);

      const [user, profile] = await Promise.all([fetchUser, fetchProfile]);

      return { ...user, profile };
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed loading user or profile!',
        statusCode: 500,
        code: 'FAILED-LOADING-USER-OR-PROFILE',
      });
    }
  },
};
