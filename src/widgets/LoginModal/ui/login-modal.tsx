import { FC, memo } from 'react';
import { Modal } from '@shared/ui';
import dynamic from 'next/dynamic';

const LazyContentModal = dynamic(() => import('./content-modal.tsx').then((el) => el.ContentModal));

export const LoginModal: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = memo(({ isOpen = false, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <LazyContentModal onClose={onClose} />
    </Modal>
  );
});
