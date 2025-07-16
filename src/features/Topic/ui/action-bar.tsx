import { useAddReactionMutation, useGetReactionsQuery } from '@app/api';
import { TReactionType } from '@entities/Reaction';
import { TTopicId } from '@entities/Topic';
import { getServerErrorMessage } from '@shared/model';
import { ReportModal } from '@widgets/ReportModal';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, MouseEventHandler, useCallback, useState } from 'react';
import { IconButton } from '@shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import { TUserId } from '@entities/User';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { topicsApi } from '@entities/Topic/api/topics-api';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import CommentIcon from '@mui/icons-material/Comment';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { TCategoryId } from '@entities/categories-list';
import { selectAuthUser, selectAuthUserProfile, useAuthStore } from '@entities/auth';

interface IProps {
  category_id: TCategoryId;
  comments_length: number;
  topic_id: TTopicId;
  user_id_topic: TUserId;
  showComments: boolean;
  setShowComments: Dispatch<IProps['showComments']>;
}

export const ActionBar: FC<IProps> = ({
  category_id,
  topic_id,
  comments_length,
  user_id_topic,
  showComments,
  setShowComments,
}) => {
  const route = useRouter();
  const queryClient = useQueryClient();

  const {
    isPending: isPendingDeleteTopic,
    isError: isErrorDeleteTopic,
    error: errorDeleteTopic,
    mutate: deleteTopic,
  } = useMutation({
    mutationFn: topicsApi.deleteTopic,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['topics', category_id] });
      route.back();
    },
  });

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

  const [showReportModal, setShowReportModal] = useState(false);

  const authUser = useAuthStore(selectAuthUser);
  const authUserProfile = useAuthStore(selectAuthUserProfile);

  const errorMessageAddReaction = getServerErrorMessage(errorAddReaction),
    errorMessageReactions = getServerErrorMessage(errorReactions);

  const closeReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

  const handleClickDeleteTopic: MouseEventHandler = () => {
    deleteTopic({ topic_id });
  };

  const handleClickAddReaction = (type_reaction: TReactionType) => {
    void addReaction({ topic_id, type_reaction });
  };

  return (
    <section className="mt-2">
      <IconButton
        title={'Like'}
        aria-label="Like"
        isLoading={isLoadingAddReaction || isLoadingReactions}
        onClick={() => {
          handleClickAddReaction('like');
        }}
      >
        {reactions?.find(
          (reaction) => reaction.type_reaction === 'like' && reaction.user_id === authUser?.id
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
        aria-expanded={showComments || undefined}
        aria-controls={showComments ? 'comments-topic' : undefined}
        onClick={() => {
          setShowComments(!showComments);
        }}
      >
        {showComments ? <CommentsDisabledIcon /> : <CommentIcon />}
        <span className="ml-1">{comments_length}</span>
      </IconButton>
      <IconButton
        className="ml-full"
        title={'Report topic'}
        aria-label="Report topic"
        onClick={() => {
          setShowReportModal(true);
        }}
      >
        <ReportGmailerrorredIcon />
      </IconButton>
      <ReportModal
        target_id={topic_id}
        target_type="topic"
        open={showReportModal}
        close={closeReportModal}
      />
      {(Boolean(authUserProfile?.is_admin) || user_id_topic === authUser?.id) && (
        <IconButton
          title="Delete topic"
          aria-label="Delete topic"
          isLoading={isPendingDeleteTopic}
          onClick={handleClickDeleteTopic}
        >
          <DeleteIcon />
        </IconButton>
      )}
      {isErrorAddReaction && <span>{errorMessageAddReaction}</span>}
      {isErrorReactions && <span>{errorMessageReactions}</span>}
      {isErrorDeleteTopic && <div>{errorDeleteTopic.message}</div>}
    </section>
  );
};
