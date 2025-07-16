'use client';
import { FC, useState, useCallback } from 'react';
import { Button } from '@shared/ui';
import dynamic from 'next/dynamic';
import { selectAuthUserProfile, useAuthStore } from '@entities/auth';

const MemoCreateCategoryModal = dynamic(async () =>
  import('@widgets/CreateCategoryModal').then((file) => file.CreateCategoryModal)
);

export const CategoriesToolbar: FC = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const authUserProfile = useAuthStore(selectAuthUserProfile);

  const closeCreateCategoryModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  return (
    <div>
      {authUserProfile?.is_admin && (
        <Button
          variant="contained"
          className="w-auto"
          onClick={() => {
            setShowCreateCategoryModal(true);
          }}
        >
          New Category
        </Button>
      )}
      {authUserProfile?.is_admin && (
        <MemoCreateCategoryModal open={showCreateCategoryModal} close={closeCreateCategoryModal} />
      )}
    </div>
  );
};
