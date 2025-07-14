import { createQueryHook } from '@shared/api';
import { TUserHooksApi } from './user-api-endpoints.type';
import { userEndpointsApi } from './user-api-endpoints';

export const userHooksApi: TUserHooksApi = {
  useGetUserQuery: createQueryHook<TUserHooksApi['useGetUserQuery']>((payload) => ({
    queryFn: () => userEndpointsApi.getUser(payload),
    queryKey: ['user', payload.user_id ?? payload.username],
  })),
  useGetUserAndProfileQuery: createQueryHook<TUserHooksApi['useGetUserAndProfileQuery']>(
    (payload) => ({
      queryFn: () => userEndpointsApi.getUserAndProfile(payload),
      queryKey: ['user', 'user-profile', payload.user_id ?? payload.username],
    })
  ),
};
