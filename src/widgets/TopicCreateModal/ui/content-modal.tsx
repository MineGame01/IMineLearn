import { FC, useState } from 'react';
import { Button, Input } from '@shared/ui';
import { TCategoryId } from '@entities/categories-list';
import { categoriesApi } from '@entities/categories-list/api/categories-api';
import { topicsApi } from '@entities/Topic/api/topics-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const ContentModal: FC<{ category_id: TCategoryId; close: () => void }> = ({
  category_id,
  close,
}) => {
  const [titleTopicValue, setTitleTopicValue] = useState('');
  const [contentTopicValue, setContentTopicValue] = useState('');

  const queryClient = useQueryClient();

  const {
    mutate: createTopic,
    isPending: isPendingCreateTopic,
    error: errorCreateTopic,
    isError: isErrorCreateTopic,
  } = useMutation({
    mutationFn: topicsApi.createTopic,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['topics', category_id] });
      close();
    },
  });

  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
    data: category,
  } = useQuery({
    queryFn: async () => await categoriesApi.getCategoryById(category_id),
    queryKey: ['category', category_id],
  });

  const isError = isErrorCategory || isErrorCreateTopic;

  const handleClickCreateTopic = () => {
    if (titleTopicValue && contentTopicValue) {
      createTopic({
        category_id,
        title: titleTopicValue,
        content: contentTopicValue,
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
            {errorCreateTopic?.message}
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
          disabled={isLoadingCategory || isPendingCreateTopic}
          variant="contained"
          className="w-auto ml-auto"
        >
          Public topic
        </Button>
      </section>
    </article>
  );
};
