import { authStore } from '@entities/auth';
import { ResponseError } from '@shared/model';
import ky from 'ky';
import { authApiEndpoints } from '@entities/auth/api/auth-api-endpoints';
import { checkResponseTokenError } from '@shared/api';

const is_server_environment = process.env.IS_SERVER_ENVIRONMENT;

export const appApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_REST_API_URL,
  credentials: 'include',
  hooks: {
    beforeError: [
      async (error) => {
        const response = await error.response.json();

        // If the response from the server has a known error structure, then we use the class constructor to further check the inheritance
        if (response && typeof response === 'object') {
          if ('message' in response && 'statusCode' in response && 'code' in response) {
            if (
              typeof response.message === 'string' &&
              typeof response.statusCode === 'number' &&
              typeof response.code === 'string'
            ) {
              const { message, statusCode, code } = response;
              error.cause = new ResponseError(message, statusCode, code, error);

              if (error.cause instanceof ResponseError) {
                if (error.cause.statusCode === 401) {
                  if (checkResponseTokenError(error.cause)) {
                    authApiEndpoints
                      .refreshToken()
                      .then(({ access_token, user_id }) => {
                        void authStore.getState().setLoginCredentials(access_token, user_id);
                      })
                      .catch((error: unknown) => {
                        if (error instanceof Error) {
                          if (error.cause instanceof ResponseError) {
                            if (checkResponseTokenError(error.cause, 'refresh'))
                              authStore.getState().clearLoginCredentials();
                          } else {
                            throw error;
                          }
                        }
                      });
                  } else if (checkResponseTokenError(error.cause, 'refresh')) {
                    authStore.getState().clearLoginCredentials();
                  }
                }
              }

              return error;
            }
          }
        }

        return error;
      },
    ],
    beforeRequest: [
      (request) => {
        if (!is_server_environment) {
          const { access_token } = authStore.getState();
          if (access_token) {
            request.headers.set('Authorization', access_token);
          }
        }
      },
    ],
  },
  cache: is_server_environment ? 'force-cache' : undefined,
});
