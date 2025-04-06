'use client';
import { useAppSelector } from '@app/lib';
import { selectAuthIsLoading, selectAuthUserInfo } from '@widgets/LoginModal';
import { FC, useEffect } from 'react';
import { ReportsList } from './reports-list';

const ModerationPage: FC = () => {
  const { is_admin, access_token } = useAppSelector(selectAuthUserInfo);
  const isLoadingAuth = useAppSelector(selectAuthIsLoading);

  useEffect(() => {
    if (!is_admin && !isLoadingAuth && access_token) {
      window.location.href = '/';
    }
  }, [is_admin, isLoadingAuth]);

  return <div>{access_token && <ReportsList />}</div>;
};

export default ModerationPage;
