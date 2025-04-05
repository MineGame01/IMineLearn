import { FC, useEffect } from 'react';
import { ReportForm } from '@widgets/ReportModal/ui/report-form';
import { useLazyGetCommentByIdQuery, useLazyGetTopicByIdQuery } from '@app/api';
import { TReportTargetId, TReportTargetType } from '@entities/Report';

export const ContentModal: FC<{
  target_type: TReportTargetType;
  target_id: TReportTargetId;
  close: () => void;
}> = ({ target_type, target_id, close }) => {
  const [getTopicById, { data: dataTopic, isFetching: isFetchingTopic }] =
    useLazyGetTopicByIdQuery();
  const [getCommentById, { data: dataComment, isFetching: isFetchingComment }] =
    useLazyGetCommentByIdQuery();

  const isLoading = isFetchingTopic || isFetchingComment;
  const reportContent = dataTopic?.title || dataComment?.content;

  useEffect(() => {
    switch (target_type) {
      case 'comment': {
        getCommentById({ comment_id: target_id });
        return;
      }
      case 'topic': {
        getTopicById(target_id);
        return;
      }
    }
  }, [getCommentById, getTopicById, target_id, target_type]);

  return (
    <div className="p-3 md:min-w-100">
      <div>
        <div className="font-bold text-4xl">Report Content</div>
        <div className="font-bold text-2xl my-5">
          {target_type[0].toUpperCase() + target_type.slice(1)}:{' '}
          {isLoading ? 'Loading...' : reportContent}
        </div>
      </div>
      <ReportForm close={close} target_type={target_type} target_id={target_id} />
    </div>
  );
};
