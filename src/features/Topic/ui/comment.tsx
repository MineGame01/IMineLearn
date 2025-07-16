import { FC, Fragment, useCallback, useState } from 'react';
import Image from 'next/image';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { IComment } from '@entities/Topic';
import { ReportModal } from '@widgets/ReportModal';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { getServerErrorMessage } from '@shared/model';
import { IconButton } from '@shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { commentsApiHooks } from '@entities/Topic/api/comments-api-hooks';
import { useQueryClient } from '@tanstack/react-query';
import { selectAuthUser, selectAuthUserProfile, useAuthStore } from '@entities/auth';
import { userHooksApi } from '@entities/User';

dayjs.extend(relativeTimePlugin);

export const Comment: FC<IComment> = ({ created_at, content, id, user_id, topic_id }) => {
  const [showReportModal, setShowReportModal] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: user,
    isFetching: isFetchingUser,
    isError: isErrorUser,
    error: errorUser,
  } = userHooksApi.useGetUserQuery({ user_id });

  const {
    mutate: deleteComment,
    isPending: isPendingDeleteComment,
    isError: isErrorDeleteComment,
    error: errorDeleteComment,
  } = commentsApiHooks.useDeleteCommentMutation({
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: ['topic', 'topic-comments', topic_id],
      });
    },
  });

  const authUser = useAuthStore(selectAuthUser);
  const authUserProfile = useAuthStore(selectAuthUserProfile);

  const errorMessageUser = getServerErrorMessage(errorUser);

  const closeReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

  return (
    <section>
      <div className="flex">
        {isErrorUser && <div>{errorMessageUser}</div>}
        {isFetchingUser && <div>Loading...</div>}
        {user && !isFetchingUser && (
          <Fragment>
            <div className="inline-block rounded-full overflow-hidden w-[42px] h-[42px]">
              <Image width={42} height={42} src="/defaultUser.png" alt={user.username} />
            </div>
            <div className="ml-3 flex items-center">
              <Link href={`/user/${user.username}`} className="font-medium hover:underline">
                {user.username}
              </Link>
            </div>
          </Fragment>
        )}
        <div className="text-muted ml-auto">{dayjs(created_at).toNow()}</div>
      </div>
      <div className="mt-1">{content}</div>
      <div className="mt-2 flex items-center">
        <IconButton
          title="Report comment"
          onClick={() => {
            setShowReportModal(true);
          }}
        >
          <ReportGmailerrorredIcon />
        </IconButton>
        <ReportModal
          target_id={id}
          target_type="comment"
          open={showReportModal}
          close={closeReportModal}
        />
        {(Boolean(authUserProfile?.is_admin) || authUser?.id === user_id) && (
          <IconButton
            title="Delete comment"
            onClick={() => {
              deleteComment(id);
            }}
            isLoading={isPendingDeleteComment}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      {isErrorDeleteComment && <div>{errorDeleteComment.message}</div>}
    </section>
  );
};
