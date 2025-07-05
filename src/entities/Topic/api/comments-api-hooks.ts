import { useQuery, useMutation } from '@tanstack/react-query';
import { TCommentsApiQueryHooks, TCommentsApiMutationHooks } from './comments-endpoints-api.type';
import { commentsApiEndpoints } from './comments-api-endpoints';

export const commentsApiHooks: TCommentsApiQueryHooks & TCommentsApiMutationHooks = {
  useGetCommentByIdQuery(comment_id, options, queryClient) {
    return useQuery(
      {
        queryKey: ['topic-comment', comment_id],
        ...options,
        queryFn: () => commentsApiEndpoints.getCommentById(comment_id),
      },
      queryClient
    );
  },
  useGetCommentsByTopicIdQuery(body, options, queryClient) {
    return useQuery(
      {
        queryKey: ['topic-comments', body.topic_id],
        ...options,
        queryFn: () => commentsApiEndpoints.getCommentsByTopicId(body),
      },
      queryClient
    );
  },
  useDeleteCommentMutation(options, queryClient) {
    return useMutation(
      {
        ...options,
        mutationFn: commentsApiEndpoints.deleteComment,
      },
      queryClient
    );
  },
  useCreateCommentMutation(options, queryClient) {
    return useMutation(
      {
        ...options,
        mutationFn: commentsApiEndpoints.createComment,
      },
      queryClient
    );
  },
};
