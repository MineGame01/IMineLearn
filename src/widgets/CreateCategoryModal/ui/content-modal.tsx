import { useCreateCategoryMutation } from '@app/api';
import { arrayBufferToBase64 } from '@shared/lib';
import { getServerErrorMessage } from '@shared/model';
import { Button } from '@shared/ui';
import { FC, useId } from 'react';
import { FormCreateCategory, THandleSubmitCreateCategory } from './form-create-category';

interface IProps {
  close: () => void;
}

export const ContentModal: FC<IProps> = ({ close }) => {
  const [
    createCategory,
    {
      isLoading: isLoadingCreateCategory,
      isError: isErrorCreateCategory,
      error: errorCreateCategory,
    },
  ] = useCreateCategoryMutation();

  const errorMessageCreateCategory = getServerErrorMessage(errorCreateCategory);

  const handleSubmitCreateCategory: THandleSubmitCreateCategory = async (
    _unused,
    categoryImage,
    categoryName
  ) => {
    if (categoryName) {
      let imageBase64: string | null = null;

      if (categoryImage) {
        const imageArrayBuffer = await categoryImage.arrayBuffer();
        imageBase64 = arrayBufferToBase64(imageArrayBuffer);
      }
      await createCategory({ image_base64: imageBase64, name: categoryName }).unwrap();
      close();
    }
  };

  const FORM_ID = useId();

  return (
    <div className="p-3">
      <h1 className="font-bold text-4xl mb-5">New category</h1>
      <FormCreateCategory onSubmit={handleSubmitCreateCategory} formId={FORM_ID} />
      {isErrorCreateCategory && <div>{errorMessageCreateCategory}</div>}
      {isLoadingCreateCategory && <div>Loading...</div>}
      <div className="flex justify-between mt-5 ">
        <Button className="w-auto" onClick={close} disabled={isLoadingCreateCategory}>
          Close
        </Button>
        <Button
          type="submit"
          formTarget={FORM_ID}
          form={FORM_ID}
          className="w-auto"
          variant="contained"
          disabled={isLoadingCreateCategory}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
