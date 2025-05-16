import { FC, useCallback, useEffect } from 'react';
import { ReportForm } from '@widgets/ReportModal/ui/report-form';
import { IForumApi, useLazyGetCommentByIdQuery, useLazyGetTopicByIdQuery } from '@app/api';
import { TReportTargetId, TReportTargetType } from '@entities/Report';
import { getServerErrorMessage } from '@shared/model';
import { Button } from '@shared/ui';

export const ContentModal: FC<{
  target_type: TReportTargetType;
  target_id: TReportTargetId;
  close: () => void;
}> = ({ target_type, target_id, close }) => {
  const [
    _getTopicById,
    {
      data: dataTopic,
      error: errorGetTopic,
      isError: isErrorGetTopic,
      isFetching: isFetchingGetTopic,
      isLoading: isLoadingGetTopic,
    },
  ] = useLazyGetTopicByIdQuery();
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
    [target_id]
  );

  const getTopicById = useCallback(
    (topic_id?: IForumApi['endpoints']['getTopicById']['bodyRequest']) => {
      return _getTopicById(topic_id ?? target_id);
    },
    [target_id]
  );

  useEffect(() => {
    switch (target_type) {
      case 'comment': {
        void getCommentById();
        return;
      }
      case 'topic': {
        void getTopicById();
        return;
      }
    }
  }, [getCommentById, getTopicById, target_id, target_type]);

  const isFetching = isFetchingGetTopic || isFetchingGetComment;
  const isLoading = isLoadingGetComment || isLoadingGetTopic;
  const reportContent = dataTopic?.title ?? dataComment?.content;

  const errorMessageGetTopic = getServerErrorMessage(errorGetTopic);
  const errorMessageGetComment = getServerErrorMessage(errorGetComment);

  const isError = isErrorGetComment || isErrorGetTopic;

  const handleClickReload = () => {
    switch (target_type) {
      case 'comment': {
        void getCommentById();
        return;
      }
      case 'topic': {
        void getTopicById();
        return;
      }
    }
  };

  const errorMessage = (
    <div className="text-error-text">
      {isErrorGetTopic ? errorMessageGetTopic : isErrorGetComment && errorMessageGetComment}
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
