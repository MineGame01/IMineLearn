'use client';
import { FC, Fragment, useState } from 'react';
import { TTopicId } from '@entities/Topic';
import {
  useCreateCommentMutation,
  useGetCommentsByTopicIdQuery,
  useGetTopicByIdQuery,
  useGetUserQuery,
} from '@app/api';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button, Input, Skeleton } from '@shared/ui';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { getServerErrorMessage } from '@shared/model';
import { ActionBar } from './action-bar';
import { SkeletonTopic } from './skeleton-topic';
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';

dayjs.extend(relativeTimePlugin);

const MemoComment = dynamic(
  async () => await import('@features/Topic/ui/comment').then((el) => el.Comment)
);

interface IProps {
  topic_id: TTopicId;
}

export const Topic: FC<IProps> = ({ topic_id }) => {
  const {
    data: topic,
    isError: isErrorTopic,
    isLoading: isLoadingTopic,
  } = useGetTopicByIdQuery(topic_id);
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUserQuery({ user_id: topic ? topic.user_id : ' ' }, { skip: !topic });
  const {
    data: comments,
    isError: isErrorComments,
    error: errorComments,
  } = useGetCommentsByTopicIdQuery({ topic_id });
  const [createComments, { isLoading: isLoadingCreateComments }] = useCreateCommentMutation();
  const [contentComment, setContentComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const errorMessageUser = getServerErrorMessage(errorUser),
    errorMessageComments = getServerErrorMessage(errorComments);

  if (isLoadingTopic) {
    return <SkeletonTopic />;
  }

  if (isErrorTopic) {
    return <div>Error</div>;
  }

  if (topic) {
    const { title, created_at, content, user_id } = topic;

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
                <div className="ml-3 font-medium">{user.username}</div>
              </Fragment>
            )}
            {isErrorUser && <div>{errorMessageUser}</div>}
            <div className="ml-auto text-muted">{dayjs(created_at).toNow()}</div>
          </section>
          <section className="mt-1">
            <div>{content}</div>
          </section>
          <ActionBar
            topic_id={topic_id}
            user_id_topic={user_id}
            showComments={showComments}
            setShowComments={setShowComments}
          />
        </div>
        <section id={'comments-topic'}>
          <div className="p-5">
            <AnimatePresence mode="wait">
              {showComments && comments && (
                <m.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  {comments.map((comment) => (
                    <MemoComment key={comment.id} {...comment} />
                  ))}
                </m.div>
              )}
            </AnimatePresence>

            {showComments && isErrorComments && <div>{errorMessageComments}</div>}
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
          onClick={() => {
            void createComments({ content: contentComment, topic_id });
          }}
        >
          Create comment
        </Button>
        {isLoadingCreateComments && <div>Loading...</div>}
      </article>
    );
  }
};
