import { appApi } from '@app/api';
import { TProfileEndpointsApi } from './profile-api-endpoints.type';
import { getResponseError } from '@shared/model';

export const PROFILE_ENDPOINT_URL = 'user/profile';

export const profileEndpointsApi: TProfileEndpointsApi = {
  async getProfile(payload) {
    try {
      return await appApi
        .get(PROFILE_ENDPOINT_URL, {
          searchParams: payload,
          next: { tags: ['user-profile', payload.user_id ?? payload.username ?? ''] },
        })
        .json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed loading profile!',
        statusCode: 500,
        code: 'FAILED-LOADING-PROFILE',
      });
    }
  },
  async updateProfile(body) {
    try {
      return await appApi.put(PROFILE_ENDPOINT_URL, { json: body }).json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed update profile!',
        statusCode: 500,
        code: 'FAILED-UPDATE-PROFILE',
      });
    }
  },
};
