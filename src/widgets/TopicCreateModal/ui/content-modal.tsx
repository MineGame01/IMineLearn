import { FC, useState } from 'react';
import { useCreateTopicMutation } from '@app/api';
import { Button, Input } from '@shared/ui';
import { TCategoryId } from '@entities/categories-list';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@entities/categories-list/api/categories-api';
import { getServerErrorMessage } from '@shared/model';

export const ContentModal: FC<{ category_id: TCategoryId; close: () => void }> = ({
  category_id,
  close,
}) => {
  const [titleTopicValue, setTitleTopicValue] = useState('');
  const [contentTopicValue, setContentTopicValue] = useState('');

  const [
    createTopicDispatch,
    { isError: isErrorCreateTopic, error: errorCreateTopic, isLoading: isLoadingCreateTopic },
  ] = useCreateTopicMutation();

  const {
    isPending: isPendingCategory,
    isError: isErrorCategory,
    error: errorCategory,
    data: category,
  } = useQuery({
    queryFn: async () => {
      const response = await categoriesApi.getCategoryById(category_id);
      return response;
    },
    queryKey: ['category', category_id],
  });

  const isError = isErrorCategory || isErrorCreateTopic;

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
          {isPendingCategory ? 'Loading...' : category?.name}
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
        {isError && (
          <div>
            {errorCategory?.message}
            {getServerErrorMessage(errorCreateTopic)}
          </div>
        )}
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
          disabled={isPendingCategory || isLoadingCreateTopic}
          variant="contained"
          className="w-auto ml-auto"
        >
          Public topic
        </Button>
      </section>
    </article>
  );
};
