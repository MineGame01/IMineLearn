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
  useSendReportMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetReportsQuery,
  useDeleteReportMutation,
  useAddReactionMutation,
  useGetReactionsQuery,
  useUpdateUserMutation,
} = ForumApi;
