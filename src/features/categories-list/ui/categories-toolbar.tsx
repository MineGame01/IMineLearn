'use client';
import { FC, useState, useCallback } from 'react';
import { Button } from '@shared/ui';
import dynamic from 'next/dynamic';
import { selectAuthUser, useAuthStore } from '@entities/auth';

const MemoCreateCategoryModal = dynamic(async () =>
  import('@widgets/CreateCategoryModal').then((file) => file.CreateCategoryModal)
);

export const CategoriesToolbar: FC = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const authUser = useAuthStore(selectAuthUser);

  const closeCreateCategoryModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  return (
    <div>
      {authUser?.is_admin && (
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
      {authUser?.is_admin && (
        <MemoCreateCategoryModal open={showCreateCategoryModal} close={closeCreateCategoryModal} />
      )}
    </div>
  );
};
