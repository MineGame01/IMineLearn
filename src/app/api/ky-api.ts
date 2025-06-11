import { getEnvVar } from '@shared/lib';
import { ResponseError } from '@shared/model';
import ky from 'ky';

export const appApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_REST_API_URL,
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
              error.cause = new ResponseError(message, statusCode, code);
              return error;
            }
          }
        }

        return error;
      },
    ],
    beforeRequest: [
      (request) => {
        try {
          getEnvVar('IS_SERVER_ENVIRONMENT', 'SERVER_ENVIRONMENT');
        } catch (error: unknown) {
          if (error instanceof Error && error.message === 'SERVER_ENVIRONMENT') {
            try {
              const { access_token } = JSON.parse(localStorage.getItem('session') ?? '{}') as {
                access_token?: string;
              };
              if (access_token) {
                request.headers.set('Authorization', access_token);
              }
            } catch (error: unknown) {
              if (error instanceof SyntaxError) return;
              throw error;
            }
          } else {
            throw error;
          }
        }
      },
    ],
  },
  cache: 'force-cache',
});
