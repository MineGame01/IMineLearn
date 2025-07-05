import { appApi } from '@app/api';
import { getResponseError } from '@shared/model';
import { TAuthEndpointsApi } from './auth-endpoints-api.type';

export const authApiEndpoints: TAuthEndpointsApi = {
  async login(body) {
    try {
      return await appApi.post('auth/login', { json: body }).json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed authorization!',
        statusCode: 500,
        code: 'FAILED-AUTHORIZATION',
      });
    }
  },
  async registration(body) {
    try {
      return await appApi.post('auth/registration', { json: body }).json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed registration!',
        statusCode: 500,
        code: 'FAILED-REGISTRATION',
      });
    }
  },
  async refreshToken() {
    try {
      return await appApi.post('auth/refresh').json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed refresh token!',
        statusCode: 500,
        code: 'FAILED-REFRESH-TOKEN',
      });
    }
  },
  async logout() {
    try {
      return await appApi.post('auth/logout').json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed logout!',
        statusCode: 500,
        code: 'FAILED-LOGOUT',
      });
    }
  },
};
