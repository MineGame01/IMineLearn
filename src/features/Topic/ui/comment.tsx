import { FC, Fragment, useCallback, useState } from 'react';
import Image from 'next/image';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { IComment } from '@entities/Topic';
import { ReportModal } from '@widgets/ReportModal';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { useGetUserQuery } from '@app/api';
import { getServerErrorMessage } from '@shared/model';

dayjs.extend(relativeTimePlugin);

export const Comment: FC<IComment> = ({ created_at, content, _id, user_id }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUserQuery({ user_id });

  const errorMessageUser = getServerErrorMessage(errorUser);

  const closeReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

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
      <div>
        <button onClick={() => setShowReportModal(true)}>
          <ReportGmailerrorredIcon />
        </button>
        <ReportModal
          target_id={_id}
          target_type="comment"
          open={showReportModal}
          close={closeReportModal}
        />
      </div>
    </section>
  );
};
