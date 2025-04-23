'use client';
import { FC, useState, useCallback } from 'react';
import { Button } from '@shared/ui';
import { useAppSelector } from '@app/lib';
import { selectAuthUserInfo } from '@widgets/LoginModal';
import dynamic from 'next/dynamic';

const MemoCreateCategoryModal = dynamic(async () =>
  import('@widgets/CreateCategoryModal').then((file) => file.CreateCategoryModal)
);

export const CreateCategoryToolbar: FC = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const { is_admin } = useAppSelector(selectAuthUserInfo);

  const closeCreateCategoryModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  return (
    <div>
      {is_admin && (
        <Button
          variant="contained"
          className="w-auto"
          onClick={() => setShowCreateCategoryModal(true)}
        >
          New Category
        </Button>
      )}
      {is_admin && (
        <MemoCreateCategoryModal open={showCreateCategoryModal} close={closeCreateCategoryModal} />
      )}
    </div>
  );
};
