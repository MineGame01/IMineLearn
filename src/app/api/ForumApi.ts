import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IForumApi } from './IForumApi';
import { getUrlParams } from '@shared/model';
import { TState } from '@app/model';
import { selectAuthAccessToken } from '@widgets/LoginModal';

export const ForumApi = createApi({
  reducerPath: 'api',
  tagTypes: ['refetch-topics', 'refetch-comment'],
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
    getTopicsByCategory: builder.query<
      IForumApi['endpoints']['getTopicsByCategory']['dataResponse'],
      IForumApi['endpoints']['getTopicsByCategory']['bodyRequest']
    >({
      query: (bodyRequest) => {
        return `/topics?${getUrlParams(bodyRequest)}`;
      },
      providesTags: ['refetch-topics'],
    }),
    getTopicById: builder.query<
      IForumApi['endpoints']['getTopicById']['dataResponse'],
      IForumApi['endpoints']['getTopicById']['bodyRequest']
    >({
      query: (topicId) => `/topic?topic_id=${topicId}`,
    }),
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
    createTopic: builder.mutation<
      IForumApi['endpoints']['createTopic']['dataResponse'],
      IForumApi['endpoints']['createTopic']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/topic',
        method: 'POST',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-topics'],
    }),
    deleteTopic: builder.mutation<
      IForumApi['endpoints']['deleteTopic']['dataResponse'],
      IForumApi['endpoints']['deleteTopic']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/topic',
        method: 'DELETE',
        body: bodyRequest,
      }),
      invalidatesTags: ['refetch-topics'],
    }),
    getUser: builder.query<
      IForumApi['endpoints']['getUser']['dataResponse'],
      IForumApi['endpoints']['getUser']['bodyRequest']
    >({
      query: (bodyRequest) => `/user?${getUrlParams(bodyRequest)}`,
    }),
    getCommentById: builder.query<
      IForumApi['endpoints']['getCommentById']['dataResponse'],
      IForumApi['endpoints']['getCommentById']['bodyRequest']
    >({
      query: (bodyRequest) => ({
        url: '/rest/v1/rpc/get_comment_by_id',
        method: 'POST',
        body: bodyRequest,
      }),
      transformResponse(data: IForumApi['endpoints']['getCommentById']['dataResponse'][]) {
        return data[0];
      },
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
    getCategories: builder.query<
      IForumApi['endpoints']['getCategories']['dataResponse'],
      IForumApi['endpoints']['getCategories']['bodyRequest']
    >({
      query: (bodyRequest) => {
        if (bodyRequest) {
          return `/categories?${getUrlParams(bodyRequest)}`;
        } else {
          return '/categories';
        }
      },
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
  }),
});

export const {
  useCreateCommentMutation,
  useCreateTopicMutation,
  useGetTopicByIdQuery,
  useGetCommentsByTopicIdQuery,
  useSendReportMutation,
  useLazyGetTopicByIdQuery,
  useLazyGetCommentByIdQuery,
  useGetTopicsByCategoryQuery,
  useLazyGetCategoriesQuery,
  useGetCategoriesQuery,
  useDeleteTopicMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = ForumApi;
