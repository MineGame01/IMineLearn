'use client';
import { TCategoryId } from '@entities/categories-list';
import { FC } from 'react';
import { selectAuthUserProfile, useAuthStore } from '@entities/auth';
import dynamic from 'next/dynamic';

const MemoModerationToolbarContent = dynamic(
  async () => import('./moderation-toolbar-content').then((file) => file.ModerationToolbarContent),
  {
    loading: () => <div>Loading toolbar...</div>,
  }
);

export const ModerationToolbar: FC<{ category_id: TCategoryId }> = ({ category_id }) => {
  const authUserProfile = useAuthStore(selectAuthUserProfile);

  if (authUserProfile?.is_admin) {
    return <MemoModerationToolbarContent category_id={category_id} />;
  }

  return <div></div>;
};
