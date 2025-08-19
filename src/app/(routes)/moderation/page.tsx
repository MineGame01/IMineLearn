'use client';
import { FC, useEffect } from 'react';
import { ReportsList } from './reports-list';
import { selectAccessToken, selectAuthUserProfile, useAuthStore } from '@entities/auth';
import { useMutationState } from '@tanstack/react-query';

const ModerationPage: FC = () => {
  const authUserProfile = useAuthStore(selectAuthUserProfile);
  const access_token = useAuthStore(selectAccessToken);

  const refreshTokenStatus = useMutationState({
    filters: { mutationKey: ['refreshToken'] },
    select(mutate) {
      return mutate.state;
    },
  }).at(-1)?.status;

  useEffect(() => {
    if (!authUserProfile?.is_admin && refreshTokenStatus !== 'pending' && access_token) {
      window.location.href = '/';
    }
  }, [authUserProfile, refreshTokenStatus, access_token]);

  return <main>{authUserProfile?.is_admin && <ReportsList />}</main>;
};

export default ModerationPage;
