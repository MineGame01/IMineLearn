import { Button, IconButton, Input, Tab, Tabs } from '@shared/ui';
import { Editor } from '@tiptap/core';
import { FC, useActionState, useId, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { smoothTransition } from '@shared/config';
import { getOptimizeImage } from './get-optimize-image';

interface IProps {
  editor: Editor | null;
  close: () => void;
}

type TImageTypes = 'url' | 'file';

interface IFormImageState {
  imageUrl: string;
  imageFile: File | undefined;
}

export const ModalContentInputImage: FC<IProps> = ({ close, editor }) => {
  const [imageType, setImageType] = useState<TImageTypes>('url');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused, formImageAction, isPendingFormImage] = useActionState<
    IFormImageState,
    FormData & IFormImageState
  >(
    async (_unused, formData) => {
      if (editor) {
        const file = formData.get('imageFile') as IFormImageState['imageFile'];
        const url = formData.get('imageUrl') as IFormImageState['imageUrl'];

        if (imageType === 'file') {
          if (file) {
            const base64 = await getOptimizeImage(file);
            editor.commands.setImage({
              src: `data:image/png;base64,${base64}`,
            });
          }
        } else if (url) {
          editor.commands.setImage({ src: url });
        }
      }
      close();
      editor?.commands.focus();
      return {
        imageFile: undefined,
        imageUrl: '',
      };
    },
    { imageFile: undefined, imageUrl: '' }
  );

  const FORM_IMAGE_ID = useId();

  return (
    <div>
      <div className="p-3 flex items-center justify-between">
        <h1 className="m-0 text-[1.3rem]">Upload Image</h1>
        <IconButton title="Close modal" onClick={close}>
          <CloseIcon />
        </IconButton>
      </div>
      <hr />
      <div className="p-3">
        <Tabs
          currentTabId={imageType}
          onChange={(type: TImageTypes) => {
            setImageType(type);
          }}
        >
          <Tab id="url">Upload via URL</Tab>
          <Tab id="file">Browse files</Tab>
        </Tabs>
        <form action={formImageAction} className="mt-3" id={FORM_IMAGE_ID}>
          <AnimatePresence mode="wait" initial={false}>
            {imageType === 'url' ? (
              <motion.div
                key="image-url-input-container"
                variants={smoothTransition}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Input
                  label="Image URL"
                  inputAttr={{
                    name: 'imageUrl',
                    required: true,
                  }}
                />
              </motion.div>
            ) : (
              <motion.input
                variants={smoothTransition}
                initial="hidden"
                animate="visible"
                exit="hidden"
                name="imageFile"
                type="file"
                accept="image/*"
                required
              />
            )}
          </AnimatePresence>
        </form>
        <Button
          type="submit"
          form={FORM_IMAGE_ID}
          className="mt-5"
          loading={isPendingFormImage}
          variant="contained"
        >
          Upload from {imageType === 'file' ? 'File' : 'URL'}
        </Button>
      </div>
    </div>
  );
};
