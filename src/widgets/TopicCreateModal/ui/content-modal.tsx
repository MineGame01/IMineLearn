import { FC, useState } from 'react';
import { useCreateTopicMutation, useGetCategoryByIdQuery } from '@app/api';
import { Button, Input } from '@shared/ui';
import { TCategoryId } from '@entities/categories-list';
import { getServerErrorMessage } from '@shared/model';

export const ContentModal: FC<{ category_id: TCategoryId; close: () => void }> = ({
  category_id,
  close,
}) => {
  const [titleTopicValue, setTitleTopicValue] = useState('');
  const [contentTopicValue, setContentTopicValue] = useState('');
  const [createTopicDispatch, { isError, error, isLoading: isLoadingCreateTopic }] =
    useCreateTopicMutation();
  const { data: category, isLoading: isLoadingCategory } = useGetCategoryByIdQuery(category_id);

  const errorMessage = getServerErrorMessage(error);

  const handleClickCreateTopic = () => {
    if (titleTopicValue && contentTopicValue) {
      void createTopicDispatch({
        category_id,
        title: titleTopicValue,
        content: contentTopicValue,
      })
        .unwrap()
        .then(() => {
          close();
        });
    }
  };

  return (
    <article className="p-3 flex min-w-[400px] min-h-[400px] flex-col">
      <section className="grow-1">
        <h1 className="text-4xl font-bold mb-5">
          {isLoadingCategory ? 'Loading...' : category?.name}
        </h1>
        <form>
          <Input
            inputAttr={{
              type: 'text',
              value: titleTopicValue,
              onChange: (event) => {
                setTitleTopicValue(event.target.value);
              },
              name: 'heading-topic',
              required: true,
            }}
            isError={isError}
            label="Heading"
            helperText={isError && <span>{errorMessage}</span>}
          />
          <textarea
            value={contentTopicValue}
            onChange={(event) => {
              setContentTopicValue(event.target.value);
            }}
            required
            className="w-full h-full"
            placeholder="Description"
            name={'description-topic'}
          ></textarea>
        </form>
      </section>
      <section className="flex pt-3">
        <Button
          onClick={() => {
            close();
          }}
          className="w-auto"
        >
          Close
        </Button>
        <Button
          onClick={handleClickCreateTopic}
          disabled={isLoadingCategory || isLoadingCreateTopic}
          variant="contained"
          className="w-auto ml-auto"
        >
          Public topic
        </Button>
      </section>
    </article>
  );
};
