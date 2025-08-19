import { useAuthStore, selectAuthUser, selectAuthUserProfile } from '@entities/auth';
import { TUserUserName, userHooksApi } from '@entities/User';
import { useMutationState } from '@tanstack/react-query';

export const useGetUserAndProfileQuery = (username?: TUserUserName) => {
  const authUser = useAuthStore(selectAuthUser);
  const authUserProfile = useAuthStore(selectAuthUserProfile);

  const isAuthUser = username === authUser?.username;

  const refreshTokenStatus = useMutationState({
    filters: { mutationKey: ['refreshToken'] },
    select(mutate) {
      return mutate.state;
    },
  }).at(-1)?.status;

  return userHooksApi.useGetUserAndProfileQuery(
    {
      username,
    },
    {
      enabled: refreshTokenStatus !== 'pending' || !isAuthUser,
      initialData:
        authUser && authUserProfile && isAuthUser
          ? {
              id: authUser.id,
              username: authUser.username,
              email: authUser.email,
              created_at: authUser.created_at,
              profile: authUserProfile,
            }
          : undefined,
    }
  );
};
