import { arrayBufferToBase64 } from '@shared/lib';
import { Button } from '@shared/ui';
import { FC, useId } from 'react';
import { FormCreateCategory, THandleSubmitCreateCategory } from './form-create-category';
import { useMutation } from '@tanstack/react-query';
import { categoriesApi } from '@entities/categories-list/api/categories-api';

interface IProps {
  close: () => void;
}

export const ContentModal: FC<IProps> = ({ close }) => {
  const {
    mutateAsync: createCategory,
    isPending: isPendingCreateCategory,
    isError: isErrorCreateCategory,
    error: errorCreateCategory,
  } = useMutation({
    mutationFn: categoriesApi.createCategory,
  });

  const handleSubmitCreateCategory: THandleSubmitCreateCategory = async (
    _unused,
    categoryImage,
    categoryName
  ) => {
    if (categoryName) {
      await createCategory({
        image_base64: categoryImage ? arrayBufferToBase64(await categoryImage.arrayBuffer()) : null,
        name: categoryName,
      });
      close();
    }
  };

  const FORM_ID = useId();

  return (
    <div className="p-3">
      <h1 className="font-bold text-4xl mb-5">New category</h1>
      <FormCreateCategory onSubmit={handleSubmitCreateCategory} formId={FORM_ID} />
      {isErrorCreateCategory && <div>{errorCreateCategory.message}</div>}
      {isPendingCreateCategory && <div>Loading...</div>}
      <div className="flex justify-between mt-5 ">
        <Button className="w-auto" onClick={close} disabled={isPendingCreateCategory}>
          Close
        </Button>
        <Button
          type="submit"
          formTarget={FORM_ID}
          form={FORM_ID}
          className="w-auto"
          variant="contained"
          disabled={isPendingCreateCategory}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
