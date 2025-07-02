'use client';
import { FC } from 'react';
import { ReportForm } from '@widgets/ReportModal/ui/report-form';
import { TReportTargetId, TReportTargetType } from '@entities/Report';
import { Button } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { topicsApi } from '@entities/Topic/api/topics-api';
import { commentsApiHooks } from '@entities/Topic/api/comments-api-hooks';

export const ContentModal: FC<{
  target_type: TReportTargetType;
  target_id: TReportTargetId;
  close: () => void;
}> = ({ target_type, target_id, close }) => {
  const {
    data: topic,
    isLoading: isLoadingTopic,
    isError: isErrorTopic,
    error: errorTopic,
    isFetching: isFetchingTopic,
    refetch: refetchTopic,
  } = useQuery({
    queryFn: () => topicsApi.getTopicById(target_id),
    queryKey: ['topic', target_id],
    enabled: target_type === 'topic',
  });

  const {
    data: comment,
    isLoading: isLoadingComment,
    isError: isErrorComment,
    error: errorComment,
    isFetching: isFetchinsComment,
    refetch: refetchComment,
  } = commentsApiHooks.useGetCommentByIdQuery(target_id, { enabled: target_type === 'comment' });

  const isFetching = isFetchingTopic || isFetchinsComment;
  const isLoading = isLoadingComment || isLoadingTopic;
  const isError = isErrorComment || isErrorTopic;

  const reportContent = topic?.title ?? comment?.content;

  const handleClickReload = () => {
    switch (target_type) {
      case 'comment': {
        void refetchComment();
        return;
      }
      case 'topic': {
        void refetchTopic();
        return;
      }
    }
  };

  const errorMessage = (
    <div className="text-error">
      {errorComment?.message}
      {errorTopic?.message}
    </div>
  );

  const typeContent = target_type[0].toUpperCase() + target_type.slice(1);

  return (
    <div className="p-3 md:min-w-100">
      <div>
        <div className="font-bold text-4xl">Report Content</div>
        <div className="font-bold text-2xl my-5">
          <span>{typeContent}: </span>
          {!isLoading && !isFetching && !isError && reportContent}
          {isLoading && <span>Loading...</span>}
          {!isLoading && isFetching && <span>Reloading...</span>}
          {!isLoading && !isFetching && isError && errorMessage}
        </div>
        {isError && (
          <Button
            variant="contained"
            className="w-auto"
            loading={isFetching}
            onClick={handleClickReload}
            title="Reload content"
          >
            Reload
          </Button>
        )}
      </div>
      <ReportForm close={close} target_type={target_type} target_id={target_id} />
    </div>
  );
};
