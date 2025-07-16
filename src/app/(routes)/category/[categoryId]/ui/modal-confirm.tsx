'use client';
import { TCategoryId } from '@entities/categories-list';
import { categoriesApi } from '@entities/categories-list/api/categories-api';
import { Button, Modal } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, FC } from 'react';

interface IProps {
  onShowModal: Dispatch<boolean>;
  category_id: TCategoryId;
  showModalConfirm: boolean;
}

export const ModalConfirm: FC<IProps> = ({ onShowModal, showModalConfirm, category_id }) => {
  const router = useRouter();

  const {
    mutate: deleteCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: categoriesApi.deleteCategory,
    onSuccess: () => {
      router.push('/');
    },
  });

  return (
    <Modal
      classNameModal="bg-error-bg border-error p-2"
      open={showModalConfirm}
      onClose={() => {
        onShowModal(false);
      }}
    >
      <h1 className="text-error-text font-bold text-2xl">Are you sure?</h1>
      <p className="text-error">This action cannot be undone!</p>
      {error?.message}
      {isPending && <div>Deleting...</div>}
      <div className="flex justify-between mt-5">
        <Button
          type="button"
          onClick={() => {
            onShowModal(false);
          }}
          className="w-auto"
        >
          Close
        </Button>
        <Button
          className="w-auto bg-error"
          variant="contained"
          onClick={() => {
            deleteCategory({ category_id });
          }}
          type="submit"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
