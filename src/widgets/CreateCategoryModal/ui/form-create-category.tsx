import { MAX_CATEGORY_NAME_LENGTH } from '@entities/Category';
import { Input } from '@shared/ui';
import { ChangeEventHandler, FC, FormEvent, FormEventHandler, useId, useState } from 'react';

type TStateCategoryImage = File | null;

export type THandleSubmitCreateCategory = (
  event: FormEvent,
  categoryImage: TStateCategoryImage,
  categoryName: string
) => void | Promise<void>;

interface IProps {
  onSubmit: THandleSubmitCreateCategory;
  formId?: string;
  error?: string;
  isError?: boolean;
}

export const FormCreateCategory: FC<IProps> = ({ onSubmit, isError, formId }) => {
  const [categoryImage, setCategoryImage] = useState<TStateCategoryImage>(null);
  const [categoryName, setCategoryName] = useState('');

  let FORM_ID = useId();
  if (formId) FORM_ID = formId;
  const INPUT_IMAGE_CATEGORY_ID = useId();

  const handleChangeImageFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;

    if (files && files.length === 1) {
      const file = files[0];

      setCategoryImage(file);
    }
  };

  const handleChangeCategoryName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmitCreateCategory: FormEventHandler = (event) => {
    event.preventDefault();
    void onSubmit(event, categoryImage, categoryName);
  };

  return (
    <form id={FORM_ID} onSubmit={handleSubmitCreateCategory}>
      <Input
        inputAttr={{
          type: 'text',
          name: 'new-category-name',
          value: categoryName,
          onChange: handleChangeCategoryName,
          max: MAX_CATEGORY_NAME_LENGTH,
          required: true,
        }}
        isError={isError}
        label="Name"
        helperText={<div>Max length: {MAX_CATEGORY_NAME_LENGTH}</div>}
      />
      <label htmlFor={INPUT_IMAGE_CATEGORY_ID}>Image</label>
      <br></br>
      <input
        id={INPUT_IMAGE_CATEGORY_ID}
        type="file"
        name="image-new-category"
        accept="image/png, image/jpeg"
        onChange={handleChangeImageFile}
      />
    </form>
  );
};
