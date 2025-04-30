import { FC, Fragment, useCallback, useState } from 'react';
import Image from 'next/image';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { IComment } from '@entities/Topic';
import { ReportModal } from '@widgets/ReportModal';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { useDeleteCommentMutation, useGetUserQuery } from '@app/api';
import { getServerErrorMessage } from '@shared/model';
import { IconButton } from '@shared/ui';
import { useAppSelector } from '@app/lib';
import { selectAuthUserInfo } from '@widgets/LoginModal';
import DeleteIcon from '@mui/icons-material/Delete';

dayjs.extend(relativeTimePlugin);

export const Comment: FC<IComment> = ({ created_at, content, _id, user_id }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUserQuery({ user_id });
  const [
    deleteComment,
    { isLoading: isLoadingDeleteComment, isError: isErrorDeleteComment, error: errorDeleteComment },
  ] = useDeleteCommentMutation();
  const { is_admin, _id: auth_user_id } = useAppSelector(selectAuthUserInfo);

  const errorMessageUser = getServerErrorMessage(errorUser),
    errorMessageDeleteComment = getServerErrorMessage(errorDeleteComment);

  const closeReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

  const handleClickDeleteComment = () => {
    deleteComment(_id);
  };

  return (
    <section>
      <div className="flex">
        {isErrorUser && <div>{errorMessageUser}</div>}
        {isLoadingUser && <div>Loading...</div>}
        {user && !isLoadingUser && (
          <Fragment>
            <div className="inline-block rounded-full overflow-hidden w-[42px] h-[42px]">
              <Image width={42} height={42} src="/defaultUser.png" alt={user.username} />
            </div>
            <div className="ml-3 flex items-center">
              <div className="font-medium">{user.username}</div>
            </div>
          </Fragment>
        )}
        <div className="text-muted ml-auto">{dayjs(created_at).toNow()}</div>
      </div>
      <div className="mt-1">{content}</div>
      <div className="mt-2 flex items-center">
        <IconButton title="Report comment" onClick={() => setShowReportModal(true)}>
          <ReportGmailerrorredIcon />
        </IconButton>
        <ReportModal
          target_id={_id}
          target_type="comment"
          open={showReportModal}
          close={closeReportModal}
        />
        {is_admin ||
          (auth_user_id === user_id && (
            <IconButton
              title="Delete comment"
              onClick={handleClickDeleteComment}
              isLoading={isLoadingDeleteComment}
            >
              <DeleteIcon />
            </IconButton>
          ))}
      </div>
      {isErrorDeleteComment && <div>{errorMessageDeleteComment}</div>}
    </section>
  );
};
