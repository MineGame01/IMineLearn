import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IForumApi } from './IForumApi';
import { getUrlParams } from '@shared/model';
import { authStore } from '@entities/auth';

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
    prepareHeaders(headers) {
      const { access_token } = authStore.getState();

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
  }),
});

export const {
  useSendReportMutation,
  useGetReportsQuery,
  useDeleteReportMutation,
  useAddReactionMutation,
  useGetReactionsQuery,
} = ForumApi;
