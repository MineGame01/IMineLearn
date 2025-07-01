import { Editor } from '@tiptap/react';
import { FC, Fragment, useState } from 'react';
import { ModalInputImage } from './modal-input-image';
import ImageIcon from '@mui/icons-material/Image';
import { ButtonToolEditor } from './button-tool-editor';

interface IProps {
  editor: Editor | null;
}

export const EditorToolAddedImage: FC<IProps> = ({ editor }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <ButtonToolEditor
        active={editor?.isActive('image')}
        title="Upload Image"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <ImageIcon />
      </ButtonToolEditor>
      <ModalInputImage
        editor={editor}
        open={showModal}
        close={() => {
          setShowModal(false);
        }}
      />
    </Fragment>
  );
};
