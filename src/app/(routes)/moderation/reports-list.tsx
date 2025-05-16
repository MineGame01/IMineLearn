import { useGetReportsQuery } from '@app/api';
import { Report } from './report';
import { getServerErrorMessage } from '@shared/model';
import { FC } from 'react';
import { Button } from '@shared/ui';

export const ReportsList: FC = () => {
  const { data, isLoading, isError, isFetching, error, refetch } = useGetReportsQuery();

  const errorMessage = getServerErrorMessage(error);

  const handleClickReloadReports = () => {
    void refetch();
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="font-bold text-2xl">Reports</h1>
        <Button className="w-auto" variant="contained" onClick={handleClickReloadReports}>
          Reload
        </Button>
        {isFetching && !isLoading && <div>Reload...</div>}
        {isLoading && <div>Loading...</div>}
        {isError && <div>{errorMessage}</div>}
        {data && !isFetching && data.map((report) => <Report key={report.id} {...report} />)}
      </div>
    </div>
  );
};
