import { authApiEndpoints } from './auth-api-endpoints';
import { TAuthApiMutationHooks } from './auth-endpoints-api.type';
import { authStore } from '../model/auth-store';
import { createMutationHook } from '@shared/api';

export const authApiHooks: TAuthApiMutationHooks = {
  useLoginMutation: createMutationHook<TAuthApiMutationHooks['useLoginMutation']>({
    mutationKey: ['login'],
    mutationFn: authApiEndpoints.login,
    async onSuccess(data) {
      await authStore.getState().setLoginCredentials(data.access_token, data.user_id);
    },
  }),

  useRegistrationMutation: createMutationHook<TAuthApiMutationHooks['useRegistrationMutation']>({
    mutationKey: ['registration'],
    mutationFn: authApiEndpoints.registration,
    async onSuccess(data) {
      await authStore.getState().setLoginCredentials(data.access_token, data.user_id);
    },
  }),

  useRefreshTokenMutation: createMutationHook<TAuthApiMutationHooks['useRefreshTokenMutation']>({
    mutationKey: ['refreshToken'],
    mutationFn: authApiEndpoints.refreshToken,
    async onSuccess(data) {
      await authStore.getState().setLoginCredentials(data.access_token, data.user_id);
    },
  }),

  useLogoutMutation: createMutationHook<TAuthApiMutationHooks['useLogoutMutation']>({
    mutationKey: ['logout'],
    mutationFn: authApiEndpoints.logout,
    onSuccess() {
      authStore.getState().clearLoginCredentials();
    },
  }),
};
