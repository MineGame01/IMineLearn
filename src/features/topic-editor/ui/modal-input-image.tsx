import { Modal } from '@shared/ui';
import { Editor } from '@tiptap/core';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const LazyModalContentInputImage = dynamic(
  async () => import('./modal-content-input-image').then((file) => file.ModalContentInputImage),
  { loading: () => <div>Loading...</div> }
);

interface IProps {
  editor: Editor | null;
  open: boolean;
  close: () => void;
}

export const ModalInputImage: FC<IProps> = ({ open, close, editor }) => {
  return (
    <Modal classNameModal="min-w-[380px]" open={open} onClose={close}>
      <LazyModalContentInputImage close={close} editor={editor} />
    </Modal>
  );
};
