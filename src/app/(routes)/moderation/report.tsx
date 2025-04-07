import { IReport } from '@entities/Report';
import { FC } from 'react';
import dayjs from 'dayjs';
import { Button, Paper } from '@shared/ui';
import { useDeleteReportMutation } from '@app/api';
import { getServerErrorMessage } from '@shared/model';
import Link from 'next/link';

export const Report: FC<IReport> = ({ _id, user_id, content, reason, created_at }) => {
  const [deleteReport, { isLoading, isError, error }] = useDeleteReportMutation();

  const errorMessage = getServerErrorMessage(error);

  const handleClickDeleteReport = (report_id: IReport['_id']) => {
    deleteReport({ report_id });
  };

  return (
    <Paper className="p-3">
      <div>Id: {_id}</div>
      <div>
        User id:{' '}
        <Link className="border-b-2 border-accent" href={`/user/${user_id}`}>
          {user_id}
        </Link>
      </div>
      <div>Reason: {reason}</div>
      <div>Content: {content}</div>
      <div>Created at: {dayjs(created_at).format('DD/MM/YYYY')}</div>
      <Button className="w-auto" onClick={() => handleClickDeleteReport(_id)} variant="contained">
        Delete
      </Button>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{errorMessage}</div>}
    </Paper>
  );
};
