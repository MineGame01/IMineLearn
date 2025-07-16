'use client';
import { TCategoryId } from '@entities/categories-list';
import { IconButton } from '@shared/ui';
import { FC, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalConfirm } from './modal-confirm';

export const ModerationToolbar: FC<{ category_id: TCategoryId }> = ({ category_id }) => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  return (
    <article className="bg-error-bg rounded-default-radius border-error border-2 p-2">
      <h1 className="text-error-text font-bold text-2xl m-0">Danger Zone</h1>
      <section>
        <IconButton
          onClick={() => {
            setShowModalConfirm(true);
          }}
          title="Delete Category"
          className="text-error"
        >
          <DeleteIcon />
          Delete Category
        </IconButton>
      </section>
      <ModalConfirm
        showModalConfirm={showModalConfirm}
        onShowModal={setShowModalConfirm}
        category_id={category_id}
      />
    </article>
  );
};
