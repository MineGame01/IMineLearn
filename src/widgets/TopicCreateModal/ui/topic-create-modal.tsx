import { memo } from 'react';
import { Modal } from '@shared/ui';
import { TCategoryId } from '@entities/Category';
import dynamic from 'next/dynamic';

const LazyContentModal = dynamic(async () =>
  import('./content-modal.tsx').then((el) => el.ContentModal)
);

interface IProps {
  onClose: () => void;
  open: boolean;
  category_id: TCategoryId;
}

export const TopicCreateModal = memo<IProps>(({ category_id, onClose, open }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <LazyContentModal category_id={category_id} close={onClose} />
    </Modal>
  );
});
