'use client';
import { FC, useEffect } from 'react';
import { ReportsList } from './reports-list';
import { selectAccessToken, selectAuthUser, useAuthStore } from '@entities/auth';
import { useMutationState } from '@tanstack/react-query';

const ModerationPage: FC = () => {
  const authUser = useAuthStore(selectAuthUser);
  const access_token = useAuthStore(selectAccessToken);

  const refreshTokenStatus = useMutationState({
    filters: { mutationKey: ['refreshToken'] },
    select(mutate) {
      return mutate.state;
    },
  }).at(-1)?.status;

  useEffect(() => {
    if (!authUser?.is_admin && refreshTokenStatus !== 'pending' && access_token) {
      window.location.href = '/';
    }
  }, [authUser, refreshTokenStatus, access_token]);

  return <div>{authUser?.is_admin && <ReportsList />}</div>;
};

export default ModerationPage;
