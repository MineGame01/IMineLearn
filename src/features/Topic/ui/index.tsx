'use client';
import { FC, Fragment, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { TTopicId } from '@entities/Topic';
import {
  useCreateCommentMutation,
  useDeleteTopicMutation,
  useGetCommentsByTopicIdQuery,
  useGetTopicByIdQuery,
  useLazyGetUserQuery,
} from '@app/api';
import { ReportModal } from '@widgets/ReportModal';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import CommentIcon from '@mui/icons-material/Comment';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Button, Input } from '@shared/ui';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { getServerErrorMessage } from '@shared/model';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTimePlugin);

const LazyComment = dynamic(
  async () => await import('@features/Topic/ui/comment').then((el) => el.Comment)
);

interface IProps {
  topic_id: TTopicId;
}

export const Topic: FC<IProps> = ({ topic_id }) => {
  const {
    data: topics,
    isError: isErrorTopics,
    isLoading: isLoadingTopics,
  } = useGetTopicByIdQuery(topic_id);
  const [
    getUser,
    { data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser },
  ] = useLazyGetUserQuery();
  const { data: comments, isError: isErrorComments } = useGetCommentsByTopicIdQuery({ topic_id });
  const [createComments, { isLoading: isLoadingCreateComments }] = useCreateCommentMutation();
  const [
    deleteTopic,
    { isLoading: isLoadingDeleteTopic, isError: isErrorDeleteTopic, error: errorDeleteTopic },
  ] = useDeleteTopicMutation();
  const [showComments, setShowComments] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [contentComment, setContentComment] = useState('');
  const route = useRouter();

  const errorMessageUser = getServerErrorMessage(errorUser);
  const errorMessageDeleteTopic = getServerErrorMessage(errorDeleteTopic);

  const closeReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

  useEffect(() => {
    if (topics) {
      getUser({ user_id: topics.user_id });
    }
  }, [topics]);

  const handleClickDeleteTopic: MouseEventHandler = async (_unused) => {
    deleteTopic({ topic_id })
      .unwrap()
      .then(() => {
        route.back();
      });
  };

  if (isLoadingTopics) {
    return <div>Loading...</div>;
  }

  if (isErrorTopics) {
    return <div>Error</div>;
  }

  if (topics) {
    const { title, created_at, content, _id } = topics;

    return (
      <article className="mt-5">
        <h1 className="font-bold grow-1 text-4xl break-words overflow-hidden max-h-[140px]">
          {title}
        </h1>
        <div className="mt-5">
          <section className="flex items-center">
            {isLoadingUser && <div>Loading...</div>}
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
          <section className="mt-1">
            <button
              aria-expanded={showComments || undefined}
              aria-controls={showComments ? 'comments-topic' : undefined}
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? <CommentsDisabledIcon /> : <CommentIcon />}
              <span>{comments ? comments.length : 'Loading...'}</span>
            </button>
            <button onClick={() => setShowReportModal(true)}>
              <ReportGmailerrorredIcon />
            </button>
            <ReportModal
              target_id={_id}
              target_type="topic"
              open={showReportModal}
              close={closeReportModal}
            />
            <button onClick={handleClickDeleteTopic}>Delete</button>
            {isLoadingDeleteTopic && <div>Loading...</div>}
            {isErrorDeleteTopic && <div>{errorMessageDeleteTopic}</div>}
          </section>
        </div>
        <section id={'comments-topic'}>
          <div className="p-5">
            {showComments &&
              comments &&
              comments.map((comment) => <LazyComment key={comment._id} {...comment} />)}
            {showComments && isErrorComments && <div>Error</div>}
          </div>
        </section>
        <Input
          label="Comment"
          value={contentComment}
          onChange={(event) => setContentComment(event.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            createComments({ content: contentComment, topic_id });
          }}
        >
          Create comment
        </Button>
        {isLoadingCreateComments && <div>Loading...</div>}
      </article>
    );
  }
};
