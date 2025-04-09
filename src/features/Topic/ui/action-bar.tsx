import {
  useAddReactionMutation,
  useDeleteTopicMutation,
  useGetCommentsByTopicIdQuery,
  useGetReactionsQuery,
} from '@app/api';
import { TReactionType } from '@entities/Reaction';
import { TTopicId } from '@entities/Topic';
import { getServerErrorMessage } from '@shared/model';
import { ReportModal } from '@widgets/ReportModal';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, MouseEventHandler, useCallback, useState } from 'react';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import CommentIcon from '@mui/icons-material/Comment';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { IconButton } from '@shared/ui';
import { useAppSelector } from '@app/lib';
import { selectAuthUserInfo } from '@widgets/LoginModal';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  topic_id: TTopicId;
  showComments: boolean;
  setShowComments: Dispatch<IProps['showComments']>;
}

export const ActionBar: FC<IProps> = ({ topic_id, showComments, setShowComments }) => {
  const [
    deleteTopic,
    { isLoading: isLoadingDeleteTopic, isError: isErrorDeleteTopic, error: errorDeleteTopic },
  ] = useDeleteTopicMutation();
  const {
    data: reactions,
    isLoading: isLoadingReactions,
    isError: isErrorReactions,
    error: errorReactions,
  } = useGetReactionsQuery({ topic_id });
  const [
    addReaction,
    { isLoading: isLoadingAddReaction, isError: isErrorAddReaction, error: errorAddReaction },
  ] = useAddReactionMutation();
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsByTopicIdQuery({
    topic_id,
  });

  const [showReportModal, setShowReportModal] = useState(false);
  const { is_admin, _id: user_id } = useAppSelector(selectAuthUserInfo);

  const route = useRouter();

  const errorMessageDeleteTopic = getServerErrorMessage(errorDeleteTopic),
    errorMessageAddReaction = getServerErrorMessage(errorAddReaction),
    errorMessageReactions = getServerErrorMessage(errorReactions);

  const closeReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

  const handleClickDeleteTopic: MouseEventHandler = () => {
    deleteTopic({ topic_id })
      .unwrap()
      .then(() => {
        route.back();
      });
  };

  const handleClickAddReaction = (type_reaction: TReactionType) => {
    addReaction({ topic_id, type_reaction });
  };

  return (
    <section className="mt-2">
      <IconButton
        title={'Like'}
        aria-label="Like"
        isLoading={isLoadingAddReaction || isLoadingReactions}
        onClick={() => handleClickAddReaction('like')}
      >
        {Boolean(
          reactions &&
            reactions.find(
              (reaction) => reaction.type_reaction === 'like' && reaction.user_id === user_id
            )
        ) ? (
          <ThumbUpAltIcon />
        ) : (
          <ThumbUpOffAltIcon />
        )}
        {reactions && (
          <span className="ml-1">
            {reactions.filter((reaction) => reaction.type_reaction === 'like').length}
          </span>
        )}
      </IconButton>
      <IconButton
        title={showComments ? 'Close comments' : 'Show Comments'}
        aria-label={showComments ? 'Close comments' : 'Show Comments'}
        isLoading={isLoadingComments}
        aria-expanded={showComments || undefined}
        aria-controls={showComments ? 'comments-topic' : undefined}
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? <CommentsDisabledIcon /> : <CommentIcon />}
        {comments ? <span className="ml-1">{comments.length}</span> : undefined}
      </IconButton>
      <IconButton
        className="ml-full"
        title={'Report topic'}
        aria-label="Report topic"
        onClick={() => setShowReportModal(true)}
      >
        <ReportGmailerrorredIcon />
      </IconButton>
      <ReportModal
        target_id={topic_id}
        target_type="topic"
        open={showReportModal}
        close={closeReportModal}
      />
      {is_admin && (
        <IconButton
          title="Delete topic"
          aria-label="Delete topic"
          isLoading={isLoadingDeleteTopic}
          onClick={handleClickDeleteTopic}
        >
          <DeleteIcon />
        </IconButton>
      )}
      {isErrorAddReaction && <span>{errorMessageAddReaction}</span>}
      {isErrorReactions && <span>{errorMessageReactions}</span>}
      {isErrorDeleteTopic && <div>{errorMessageDeleteTopic}</div>}
    </section>
  );
};
