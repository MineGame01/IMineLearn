import { createMutationHook, createQueryHook } from '@shared/api';
import { TProfileHooksApi } from './profile-api-endpoints.type';
import { profileEndpointsApi } from './profile-api-endpoints';
import { useQueryClient } from '@tanstack/react-query';

export const profileHooksApi: TProfileHooksApi = {
  useGetProfileQuery: createQueryHook<TProfileHooksApi['useGetProfileQuery']>((user_id) => ({
    queryFn: () => profileEndpointsApi.getProfile(user_id),
    queryKey: ['user-profile', user_id],
  })),
  useUpdateProfileMutation: createMutationHook<TProfileHooksApi['useUpdateProfileMutation']>(() => {
    const queryClient = useQueryClient();

    return {
      mutationFn: profileEndpointsApi.updateProfile,
      async onSuccess(_data, user_id) {
        await queryClient.invalidateQueries({ queryKey: ['user-profile', user_id] });
      },
    };
  }),
};
