'use client';
import { ForumApi } from '@app/api';
import { TStartAppListening } from '@app/model';
import { createAction } from '@reduxjs/toolkit';
import {
  clearAuthError,
  addAuthData,
  setAuthError as setAuthErrorActionCreator,
  setAuthLoading,
  clearAuthData,
} from './authSlice';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { TUserEmail, TUserUserName } from '@entities/User';

/**
 * An action creator that is used to perform authorization, registration, and checking of the current session.
 *
 * @param email New user email
 * @param password User password
 * @param typeAuth Authorization type
 */
export const authLogin = createAction(
  'auth/authLogin',
  (
    email: TUserEmail | null,
    password: string | null,
    username: TUserUserName | null,
    typeAuth: TTypeAuth
  ) => {
    return {
      payload: {
        email,
        password,
        username,
        typeAuth,
      },
    };
  }
);

const KEY_LOGIN_CREDENTIALS = 'session';

interface ISession {
  access_token: string;
  refresh_token?: string;
}

const getLoginCredentials = (): Required<ISession> | null => {
  const login_credentials = localStorage.getItem(KEY_LOGIN_CREDENTIALS);

  if (login_credentials) {
    return JSON.parse(login_credentials);
  }

  return null;
};

const setLoginCredentials = (session: ISession) => {
  const currentSession = getLoginCredentials();

  localStorage.setItem(
    KEY_LOGIN_CREDENTIALS,
    JSON.stringify(currentSession ? { ...currentSession, ...session } : session)
  );
};

const clearLoginCredentials = () => {
  localStorage.removeItem(KEY_LOGIN_CREDENTIALS);
};

let idSubscriptionTimeout: NodeJS.Timeout | null = null;

/**
 * An "authLogin" action listener that performs all the necessary actions for authorization, registration, and session verification.
 */
export const authListener = (startAppListening: TStartAppListening) => {
  // Time after which the error will be removed
  const TIMEOUT_CLEAR_ERROR = 10000;

  startAppListening({
    actionCreator: authLogin,
    effect: async (action, { dispatch }) => {
      const { email, password, username, typeAuth } = action.payload;

      const actionRefreshTokenCreator = ForumApi.endpoints.refreshAccessToken.initiate;
      const actionGetUserCreator = ForumApi.endpoints.getUser.initiate;

      /**
       * Used to set the error to state
       *
       * Also sets a countdown after which the installed error will be removed.
       *
       * @param error Error line
       * */
      const setAuthError = (error: string) => {
        dispatch(setAuthErrorActionCreator(error));

        setTimeout(() => {
          dispatch(clearAuthError());
        }, TIMEOUT_CLEAR_ERROR);
      };

      const unSubscriptionRefreshAccessToken = () => {
        if (idSubscriptionTimeout) {
          clearTimeout(idSubscriptionTimeout);
          idSubscriptionTimeout = null;
        }
      };

      const subscriptionRefreshAccessToken = async () => {
        const REFRESH_TIMEOUT = 1000 * 60 * 10;
        if (!idSubscriptionTimeout) {
          const subscription = async () => {
            idSubscriptionTimeout = setTimeout(async () => {
              const loginCredentials = getLoginCredentials();

              if (loginCredentials) {
                try {
                  const { access_token, user_id } = await dispatch(
                    actionRefreshTokenCreator({
                      refresh_token: loginCredentials.refresh_token,
                    })
                  ).unwrap();
                  const user = await dispatch(actionGetUserCreator({ user_id })).unwrap();
                  setLoginCredentials({ access_token });
                  dispatch(addAuthData({ access_token, ...user }));
                } catch (error) {
                  console.error('Failed to refresh access token!', error);
                } finally {
                  setTimeout(subscription, REFRESH_TIMEOUT);
                }
              } else {
                console.error('Session not found!');
                unSubscriptionRefreshAccessToken();
              }
            }, REFRESH_TIMEOUT);
          };

          await subscription();
        }
      };

      const authorization = async ({
        typeAuth,
        email,
        password,
        username,
      }: {
        typeAuth: TTypeAuth;
        email: TUserEmail;
        password: string;
        username: TUserUserName | null;
      }) => {
        const { login: loginEndpoint, registration: registrationEndpoint } = ForumApi.endpoints;
        const loginActionCreator = loginEndpoint.initiate;
        const registrationActionCreator = registrationEndpoint.initiate;

        let loginCredentials = await dispatch(
          typeAuth === 'registration' && username
            ? registrationActionCreator({ email, password, username })
            : loginActionCreator({ email, password })
        ).unwrap();

        const user = await dispatch(
          actionGetUserCreator({ user_id: loginCredentials.user_id })
        ).unwrap();
        setLoginCredentials(loginCredentials);
        dispatch(addAuthData({ access_token: loginCredentials.access_token, ...user }));
        await subscriptionRefreshAccessToken();
      };

      const catchErrorAuthorization = (error: unknown) => {
        if (error instanceof Error) {
          setAuthError(error.message);
        } else if (error && typeof error === 'object') {
          if ('data' in error && typeof error.data === 'object' && error.data) {
            if ('message' in error.data && typeof error.data.message === 'string') {
              setAuthError(error.data.message);
            }
          }
        } else {
          setAuthError('Unknown Error!');
          throw error;
        }
      };

      dispatch(setAuthLoading(true));
      if (email && password && typeAuth !== 'checkSession') {
        try {
          await authorization({ typeAuth, email, password, username });
        } catch (error) {
          catchErrorAuthorization(error);
        } finally {
          dispatch(setAuthLoading(false));
        }
      }

      if (typeAuth === 'checkSession') {
        const loginCredentials = getLoginCredentials();

        if (loginCredentials) {
          const { access_token, user_id } = await dispatch(
            actionRefreshTokenCreator({
              refresh_token: loginCredentials.refresh_token,
            })
          ).unwrap();
          const user = await dispatch(actionGetUserCreator({ user_id })).unwrap();
          setLoginCredentials({ access_token });
          dispatch(addAuthData({ access_token, ...user }));
          await subscriptionRefreshAccessToken();
        }
      }

      if (typeAuth === 'logout') {
        unSubscriptionRefreshAccessToken();
        clearLoginCredentials();
        dispatch(clearAuthData());
      }

      dispatch(setAuthLoading(false));
    },
  });
};
