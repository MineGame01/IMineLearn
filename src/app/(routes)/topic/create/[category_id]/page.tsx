'use client';
import { categoriesApi } from '@entities/categories-list/api/categories-api';
import { TopicEditor, useTopicEditor } from '@features/topic-editor';
import { Button, Input, Link } from '@shared/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FC, FormEvent, useId, useRef, useState } from 'react';
import { FailedLoadingCategoryPageError } from './_model/failed-loading-category-page-error';
import { useRouter } from 'next/navigation';
import { topicsApi } from '@entities/Topic/api/topics-api';
import Joi from 'joi';
import { TopicTitleSchema, TTopicTitle } from '@entities/Topic';

interface IFormCreateTopicElements extends HTMLFormControlsCollection {
  topicTitle: HTMLInputElement;
}

interface IFormCreateTopicElement extends HTMLFormElement {
  readonly elements: IFormCreateTopicElements;
}

const TopicCreatePage: FC = () => {
  const { category_id: category_id_param } = useParams();
  const router = useRouter();

  const category_id = Array.isArray(category_id_param) ? category_id_param[0] : category_id_param;

  const [errorTopicTitle, setErrorTopicTitle] = useState<string | null>(null);
  const [topicEditor, topicEditorTools] = useTopicEditor();
  const errorTopicTitleTimeoutId = useRef<NodeJS.Timeout>(null);

  const {
    data: category,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useQuery({
    queryFn: () => categoriesApi.getCategoryById(category_id ?? ''),
    queryKey: ['category', category_id],
    enabled: Boolean(category_id),
  });

  const {
    isPending: isPendingCreateTopic,
    isError: isErrorCreateTopic,
    error: errorCreateTopic,
    mutate: createTopic,
  } = useMutation({
    mutationFn: topicsApi.createTopic,
    onSuccess(topic_id) {
      router.push(`/topic/${topic_id}`);
    },
  });

  const FORM_CREATE_TOPIC_ID = useId();
  const HELPER_TEXT_INPUT_TITLE_TOPIC_ID = useId();

  if (isLoadingCategory) {
    return (
      <div className="container mx-auto">
        <div className="p-4 bg-surface text-center">
          <h1>Loading topic editor...</h1>
        </div>
      </div>
    );
  }

  if (isErrorCategory) {
    throw new FailedLoadingCategoryPageError(errorCategory.message);
  }

  if (!category) {
    throw new FailedLoadingCategoryPageError('Category not found!');
  }

  const withTimeoutClearErrorTopicTitle =
    <TArgs = unknown,>(callBack: (...args: TArgs[]) => Promise<void>) =>
    async (args: TArgs) => {
      setErrorTopicTitle(null);
      if (errorTopicTitleTimeoutId.current) clearTimeout(errorTopicTitleTimeoutId.current);

      try {
        await callBack(args);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorTopicTitle(error.message);
        }
        setTimeout(() => {
          setErrorTopicTitle(null);
        }, 10000);
      }
    };

  const handleSubmitCreateTopic = async (event: FormEvent<IFormCreateTopicElement>) => {
    event.preventDefault();

    const value = await Joi.object<{ title: TTopicTitle }, true>({
      title: TopicTitleSchema.required(),
    }).validateAsync({ title: event.currentTarget.elements.topicTitle.value }, {});

    const topicEditorJSON = JSON.stringify(topicEditor?.getJSON().content);

    if (category_id)
      createTopic({ category_id: category_id, title: value.title, content: topicEditorJSON });
  };

  const categoryName = category.name;

  return (
    <div className="container mx-auto">
      <div className="p-4 bg-surface">
        <div>
          <Link aria-label={`Go to category ${categoryName}`} href={`/category/${category.id}`}>
            {categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold">New Topic</span>
        </div>
        <h1 className="font-bold text-2xl my-4">Create a New Topic in {categoryName}</h1>
        <form
          id={FORM_CREATE_TOPIC_ID}
          onSubmit={(event) => {
            void withTimeoutClearErrorTopicTitle(handleSubmitCreateTopic)(
              event as FormEvent<IFormCreateTopicElement>
            );
          }}
        >
          <Input
            isError={isErrorCreateTopic || Boolean(errorTopicTitle)}
            inputAttr={{
              name: 'topicTitle',
              required: true,
              'aria-describedby': HELPER_TEXT_INPUT_TITLE_TOPIC_ID,
            }}
            label="Topic title"
            helperText={
              isErrorCreateTopic || errorTopicTitle ? (
                <span>{isErrorCreateTopic ? errorCreateTopic.message : errorTopicTitle}</span>
              ) : (
                <span id={HELPER_TEXT_INPUT_TITLE_TOPIC_ID} className="text-muted">
                  Keep it concise and descriptive.
                </span>
              )
            }
          />
        </form>
        <div className="mt-5">
          <label>Content</label>
          <TopicEditor editor={topicEditor} editorTools={topicEditorTools} />
          <span className="text-[0.8rem] text-muted py-1">
            You can use Markdown for formatting. Be clear and provide enough details for discussion.
          </span>
        </div>
        <div className="flex justify-between *:w-auto pt-5">
          <Button
            disabled={isPendingCreateTopic}
            onClick={() => {
              router.back();
            }}
          >
            To Back
          </Button>
          <Button
            type="submit"
            form={FORM_CREATE_TOPIC_ID}
            loading={isPendingCreateTopic}
            disabled={topicEditor?.isEmpty}
            variant="contained"
          >
            Create topic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicCreatePage;
