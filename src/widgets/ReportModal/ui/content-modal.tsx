'use client';
import { FC, useCallback, useEffect } from 'react';
import { ReportForm } from '@widgets/ReportModal/ui/report-form';
import { IForumApi, useLazyGetCommentByIdQuery } from '@app/api';
import { TReportTargetId, TReportTargetType } from '@entities/Report';
import { getServerErrorMessage } from '@shared/model';
import { Button } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { topicsApi } from '@entities/Topic/api/topics-api';

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

  const [
    _getCommentById,
    {
      data: dataComment,
      error: errorGetComment,
      isError: isErrorGetComment,
      isFetching: isFetchingGetComment,
      isLoading: isLoadingGetComment,
    },
  ] = useLazyGetCommentByIdQuery();

  const getCommentById = useCallback(
    (comment_id?: IForumApi['endpoints']['getCommentById']['bodyRequest']) => {
      return _getCommentById(comment_id ?? target_id);
    },
    [_getCommentById, target_id]
  );

  useEffect(() => {
    switch (target_type) {
      case 'comment': {
        void getCommentById();
        return;
      }
    }
  }, [getCommentById, target_id, target_type]);

  const isFetching = isFetchingTopic || isFetchingGetComment;
  const isLoading = isLoadingGetComment || isLoadingTopic;
  const reportContent = topic?.title ?? dataComment?.content;

  const errorMessageGetComment = getServerErrorMessage(errorGetComment);

  const isError = isErrorGetComment || isErrorTopic;

  const handleClickReload = () => {
    switch (target_type) {
      case 'comment': {
        void getCommentById();
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
      {errorMessageGetComment}
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
