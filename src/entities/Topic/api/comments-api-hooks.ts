import { useQuery, useMutation } from '@tanstack/react-query';
import { TCommentsApiQueryHooks, TCommentsApiMutationHooks } from './comments-endpoints-api.type';
import { commentsApiEndpoints } from './comments-api-endpoints';

export const commentsApiHooks: TCommentsApiQueryHooks & TCommentsApiMutationHooks = {
  useGetCommentByIdQuery(comment_id, options) {
    return useQuery({
      queryKey: ['topic-comment', comment_id],
      ...options,
      queryFn: () => commentsApiEndpoints.getCommentById(comment_id),
    });
  },
  useGetCommentsByTopicIdQuery(body, options) {
    return useQuery({
      queryKey: ['topic-comments', body.topic_id],
      ...options,
      queryFn: () => commentsApiEndpoints.getCommentsByTopicId(body),
    });
  },
  useDeleteCommentMutation(options) {
    return useMutation({
      ...options,
      mutationFn: commentsApiEndpoints.deleteComment,
    });
  },
  useCreateCommentMutation(options) {
    return useMutation({
      ...options,
      mutationFn: commentsApiEndpoints.createComment,
    });
  },
};
