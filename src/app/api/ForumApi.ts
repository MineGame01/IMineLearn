import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IForumApi } from './IForumApi';
import { getUrlParams } from '@shared/model';
import { TState } from '@app/model';
import { selectAuthAccessToken } from '@widgets/LoginModal';

export const ForumApi = createApi({
  reducerPath: 'api',
  tagTypes: [
    'refetch-topics',
    'refetch-comment',
    'refetch-reports',
    'refetch-reactions',
    'refetch-categories',
    'refetch-user',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_REST_API_URL,
    prepareHeaders(headers, { getState }) {
      const access_token = selectAuthAccessToken(getState() as TState);

      if (access_token) {
        headers.set('Authorization', access_token);
      }
    },
  }),
  endpoints: (builder) => ({
    getCommentsByTopicId: builder.query<
      IForumApi['endpoints']['getCommentsByTopicId']['dataResponse'],
      IForumApi['endpoints']['getCommentsByTopicId']['bodyRequest']
    >({
      query: (bodyRequest) => `/comments?${getUrlParams(bodyRequest)}`,
      providesTags: ['refetch-comment'],
    }),
    createComment: builder.mutation<
      IForumApi['endpoints']['createComment']['dataResponse'],
      IForumApi['endpoints']['createComment']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/comments',
        method: 'POST',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-comment'],
    }),
    addReaction: builder.mutation<
      IForumApi['endpoints']['addReaction']['dataResponse'],
      IForumApi['endpoints']['addReaction']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/reaction',
        method: 'POST',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-reactions'],
    }),
    getReactions: builder.query<
      IForumApi['endpoints']['getReactions']['dataResponse'],
      IForumApi['endpoints']['getReactions']['bodyRequest']
    >({
      query: (bodyRequest) => `/reaction?${getUrlParams(bodyRequest)}`,
      providesTags: ['refetch-reactions'],
    }),
    getUser: builder.query<
      IForumApi['endpoints']['getUser']['dataResponse'],
      IForumApi['endpoints']['getUser']['bodyRequest']
    >({
      query: (bodyRequest) => `/user?${getUrlParams(bodyRequest)}`,
      providesTags: ['refetch-user'],
    }),
    getCommentById: builder.query<
      IForumApi['endpoints']['getCommentById']['dataResponse'],
      IForumApi['endpoints']['getCommentById']['bodyRequest']
    >({
      query: (comment_id) => `/comment?comment_id=${comment_id}`,
    }),
    sendReport: builder.mutation<
      IForumApi['endpoints']['sendReport']['dataResponse'],
      IForumApi['endpoints']['sendReport']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/report',
        method: 'POST',
        body: bodyRequest,
      }),
    }),
    getReports: builder.query<
      IForumApi['endpoints']['getReports']['dataResponse'],
      IForumApi['endpoints']['getReports']['bodyRequest']
    >({
      query: (bodyRequest) => `/report?${bodyRequest ? getUrlParams(bodyRequest) : ''}`,
      providesTags: ['refetch-reports'],
    }),
    deleteReport: builder.mutation<
      IForumApi['endpoints']['deleteReport']['dataResponse'],
      IForumApi['endpoints']['deleteReport']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/report',
        method: 'DELETE',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-reports'],
    }),
    getCategories: builder.query<
      IForumApi['endpoints']['getCategories']['dataResponse'],
      IForumApi['endpoints']['getCategories']['bodyRequest']
    >({
      query: (bodyRequest) => `/categories?${bodyRequest ? getUrlParams(bodyRequest) : ''}`,
      providesTags: ['refetch-categories'],
    }),
    getCategoryById: builder.query<
      IForumApi['endpoints']['getCategoryById']['dataResponse'],
      IForumApi['endpoints']['getCategoryById']['bodyRequest']
    >({
      query: (category_id) => `/category?category_id=${category_id}`,
    }),
    login: builder.mutation<
      IForumApi['endpoints']['login']['dataResponse'],
      IForumApi['endpoints']['login']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/auth/login',
        method: 'POST',
        body: bodyRequest,
      }),
    }),
    registration: builder.mutation<
      IForumApi['endpoints']['registration']['dataResponse'],
      IForumApi['endpoints']['registration']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/auth/registration',
        method: 'POST',
        body: bodyRequest,
      }),
    }),
    refreshAccessToken: builder.mutation<
      IForumApi['endpoints']['refreshAccessToken']['dataResponse'],
      IForumApi['endpoints']['refreshAccessToken']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: bodyRequest,
      }),
    }),
    getConsoleParam: builder.mutation<
      IForumApi['endpoints']['getConsoleParam']['dataResponse'],
      IForumApi['endpoints']['getConsoleParam']['bodyRequest']
    >({
      query: (bodyRequest) => `/console?${getUrlParams(bodyRequest)}`,
    }),
    createCategory: builder.mutation<
      IForumApi['endpoints']['createCategory']['dataResponse'],
      IForumApi['endpoints']['createCategory']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/category',
        method: 'POST',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-categories'],
    }),
    deleteCategory: builder.mutation<
      IForumApi['endpoints']['deleteCategory']['dataResponse'],
      IForumApi['endpoints']['deleteCategory']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/category',
        method: 'DELETE',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-categories'],
    }),
    deleteComment: builder.mutation<
      IForumApi['endpoints']['deleteComment']['dataResponse'],
      IForumApi['endpoints']['deleteComment']['bodyRequest']
    >({
      query: (comment_id) => ({
        url: '/comment',
        method: 'DELETE',
        body: { comment_id },
      }),
      invalidatesTags: ['refetch-comment'],
    }),
    updateUser: builder.mutation<
      IForumApi['endpoints']['updateUser']['dataResponse'],
      IForumApi['endpoints']['updateUser']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/user',
        method: 'PUT',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-user'],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsByTopicIdQuery,
  useSendReportMutation,
  useLazyGetCommentByIdQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetReportsQuery,
  useDeleteReportMutation,
  useAddReactionMutation,
  useGetReactionsQuery,
  useDeleteCommentMutation,
  useUpdateUserMutation,
} = ForumApi;
