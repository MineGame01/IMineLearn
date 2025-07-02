import { Modal } from '@shared/ui';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const MemoContentModal = dynamic(
  async () => import('./content-modal').then((el) => el.ContentModal),
  { loading: () => <div>Loading...</div> }
);

interface IProps {
  open: boolean;
  close: () => void;
}

export const CreateCategoryModal = memo<IProps>(({ open, close }) => {
  return (
    <Modal open={open} onClose={close}>
      <MemoContentModal close={close} />
    </Modal>
  );
});
