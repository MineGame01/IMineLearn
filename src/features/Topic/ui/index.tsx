'use client';
import { FC, Fragment, useState } from 'react';
import { TTopicId } from '@entities/Topic';
import { useGetUserQuery } from '@app/api';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button, Input, Skeleton } from '@shared/ui';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { getServerErrorMessage } from '@shared/model';
import { ActionBar } from './action-bar';
import { SkeletonTopic } from './skeleton-topic';
import * as m from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { topicsApi } from '@entities/Topic/api/topics-api';
import { TopicEditorContent } from '@features/topic-editor';
import { JSONContent } from '@tiptap/react';
import { commentsApiHooks } from '@entities/Topic/api/comments-api-hooks';

dayjs.extend(relativeTimePlugin);

const MemoComment = dynamic(
  async () => await import('@features/Topic/ui/comment').then((el) => el.Comment)
);

interface IProps {
  topic_id: TTopicId;
}

export const Topic: FC<IProps> = ({ topic_id }) => {
  const queryClient = useQueryClient();

  const {
    data: topic,
    isLoading: isLoadingTopic,
    isError: isErrorTopic,
    error: errorTopic,
  } = useQuery({
    queryFn: () => topicsApi.getTopicByIdAndComments({ topic_id }),
    queryKey: ['topic', 'topic-comments', topic_id],
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUserQuery({ user_id: topic ? topic.user_id : ' ' }, { skip: !topic });

  const {
    mutate: createComment,
    isPending: isPendingCreateComment,
    isError: isErrorCreateComment,
    error: errorCreateComment,
  } = commentsApiHooks.useCreateCommentMutation({
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: ['topic', 'topic-comments', topic_id],
      });
    },
  });

  const [contentComment, setContentComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const errorMessageUser = getServerErrorMessage(errorUser);

  if (isLoadingTopic) {
    return <SkeletonTopic />;
  }

  if (isErrorTopic) {
    return <div>{errorTopic.message}</div>;
  }

  if (topic) {
    const { title, created_at, content, user_id } = topic;

    const topicEditorContent = ((): JSONContent[] => {
      try {
        const JSONContent = JSON.parse(topic.content) as JSONContent[];
        return JSONContent;
      } catch {
        return [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: topic.content,
              },
            ],
          },
        ];
      }
    })();

    return (
      <article className="mt-5">
        <h1 className="font-bold grow-1 text-4xl break-words overflow-hidden max-h-[140px]">
          {title}
        </h1>
        <div className="mt-5">
          <section className="flex items-center">
            {isLoadingUser && <Skeleton />}
            {!isLoadingUser && user && (
              <Fragment>
                <div className="inline-block rounded-full overflow-hidden w-[42px] h-[42px]">
                  <Image width={42} height={42} src="/defaultUser.png" alt={user.username} />
                </div>
                <Link href={`/user/${user.username}`} className="ml-3 hover:underline font-medium">
                  {user.username}
                </Link>
              </Fragment>
            )}
            {isErrorUser && <div>{errorMessageUser}</div>}
            <div className="ml-auto text-muted">{dayjs(created_at).toNow()}</div>
          </section>
          <section className="mt-1">
            {content && (
              <TopicEditorContent
                topicEditorOptions={{
                  content: { type: 'doc', content: topicEditorContent },
                  editable: false,
                }}
              />
            )}
          </section>
          <ActionBar
            category_id={topic.category_id}
            comments_length={topic.comments.length}
            topic_id={topic_id}
            user_id_topic={user_id}
            showComments={showComments}
            setShowComments={setShowComments}
          />
        </div>
        <section id={'comments-topic'}>
          <div className="p-5">
            <AnimatePresence mode="wait">
              {showComments && (
                <m.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  {topic.comments.map((comment) => (
                    <MemoComment key={comment.id} {...comment} />
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        <Input
          inputAttr={{
            value: contentComment,
            onChange: (event) => {
              setContentComment(event.target.value);
            },
          }}
          label="Comment"
        />
        <Button
          variant="contained"
          loading={isPendingCreateComment}
          onClick={() => {
            createComment({ content: contentComment, topic_id });
          }}
        >
          Create comment
        </Button>
        {isErrorCreateComment && <div>{errorCreateComment.message}</div>}
      </article>
    );
  }
};
