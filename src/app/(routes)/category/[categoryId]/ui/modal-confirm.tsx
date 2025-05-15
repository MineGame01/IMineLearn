'use client';
import { useDeleteCategoryMutation } from '@app/api';
import { TCategoryId } from '@entities/Category';
import { getServerErrorMessage } from '@shared/model';
import { Button, Modal } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { Dispatch, FC } from 'react';

interface IProps {
  onShowModal: Dispatch<boolean>;
  category_id: TCategoryId;
  showModalConfirm: boolean;
}

export const ModalConfirm: FC<IProps> = ({ onShowModal, showModalConfirm, category_id }) => {
  const [_deleteCategory, { error, isLoading }] = useDeleteCategoryMutation();
  const router = useRouter();

  const errorMessage = getServerErrorMessage(error);

  const deleteCategory = async () => {
    await _deleteCategory({ category_id }).unwrap();
    router.push('/');
  };

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
      {errorMessage}
      {isLoading && <div>Deleting...</div>}
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
            void deleteCategory();
          }}
          type="submit"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
