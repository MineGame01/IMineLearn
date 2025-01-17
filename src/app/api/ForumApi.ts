import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SUPABASE_KEY, SUPABASE_URL } from '@/app/api/supabaseClient.ts'
import { IPost, TPostId } from '@entities/Post'
import { selectAuthAccessToken } from '@widgets/LoginModal'
import { TState } from '@/app/model'
import { IForumApi } from '@/app/api/IForumApi.ts'

export const ForumApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: SUPABASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = selectAuthAccessToken(getState() as TState)

            headers.set('Authorization', 'Bearer ' + (accessToken ?? SUPABASE_KEY))
            headers.set('apiKey', SUPABASE_KEY)
        },
    }),
    endpoints: (builder) => ({
        getFilteredPost: builder.query<
            IForumApi['endpoints']['getFilteredPost']['dataResponse'],
            IForumApi['endpoints']['getFilteredPost']['bodyRequest']
        >({
            query: (bodyRequest) => {
                const { username, user_id, ...arg } = bodyRequest

                return {
                    url: '/rest/v1/rpc/get_filtered_posts',
                    method: 'POST',
                    body: {
                        ...arg,
                        username_search: username,
                        filter_user_id: user_id,
                    },
                }
            },
        }),
        getPostById: builder.query<
            IForumApi['endpoints']['getPostById']['dataResponse'],
            IForumApi['endpoints']['getPostById']['bodyRequest']
        >({
            query: (post_id) => ({
                url: '/rest/v1/rpc/get_post_by_id',
                method: 'POST',
                body: {
                    post_id,
                },
            }),
            transformResponse: (response: IPost[]) => {
                return response[0]
            },
        }),
        getCommentsByPostId: builder.query<
            IForumApi['endpoints']['getCommentsByPostId']['dataResponse'],
            IForumApi['endpoints']['getCommentsByPostId']['bodyRequest']
        >({
            query: (bodyRequest) => {
                const { post_id, ...arg } = bodyRequest

                return {
                    url: '/rest/v1/rpc/get_comments_by_post_id',
                    method: 'POST',
                    body: {
                        ...arg,
                        post_id_search: post_id,
                    },
                }
            },
        }),
        getReactions: builder.query<
            IForumApi['endpoints']['getReactions']['dataResponse'],
            IForumApi['endpoints']['getReactions']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/get_reactions',
                method: 'POST',
                body: bodyRequest,
            }),
        }),
        addComment: builder.query<
            IForumApi['endpoints']['addComment']['dataResponse'],
            IForumApi['endpoints']['addComment']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/add_comment',
                method: 'POST',
                body: bodyRequest,
            }),
        }),
        createPost: builder.query<
            IForumApi['endpoints']['createPost']['dataResponse'],
            IForumApi['endpoints']['createPost']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/create_post',
                method: 'POST',
                body: bodyRequest,
            }),
            transformResponse: (dataResponse: { new_post_id: TPostId }) => {
                return {
                    post_id: dataResponse.new_post_id,
                }
            },
        }),
        reactionComment: builder.mutation<
            IForumApi['endpoints']['reactionComment']['dataResponse'],
            IForumApi['endpoints']['reactionComment']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/add_or_update_comment_reaction',
                method: 'POST',
                body: {
                    target_id: bodyRequest.comment_id,
                    new_reaction: bodyRequest.reaction,
                },
            }),
        }),
        reactionPost: builder.mutation<
            IForumApi['endpoints']['reactionPost']['dataResponse'],
            IForumApi['endpoints']['reactionPost']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/add_or_update_post_reaction',
                method: 'POST',
                body: {
                    target_id: bodyRequest.post_id,
                    new_reaction: bodyRequest.reaction,
                },
            }),
        }),
        deleteContent: builder.query<
            IForumApi['endpoints']['deleteContent']['dataResponse'],
            IForumApi['endpoints']['deleteContent']['bodyRequest']
        >({
            query: ({ target_id, target_type }) => {
                const endpoints = {
                    comment: '/rest/v1/rpc/delete_comment_admin',
                    post: '/rest/v1/rpc/delete_post_admin',
                }

                return {
                    url: endpoints[target_type],
                    method: 'POST',
                    body: {
                        [target_type === 'comment' ? 'comment_id' : 'post_id']: target_id,
                    },
                }
            },
        }),
        getUserInfo: builder.query<
            IForumApi['endpoints']['getUserInfo']['dataResponse'],
            IForumApi['endpoints']['getUserInfo']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/get_user_info',
                method: 'POST',
                body: bodyRequest,
            }),
            transformResponse: (
                dataResponse: IForumApi['endpoints']['getUserInfo']['dataResponse'][],
            ) => {
                return dataResponse[0]
            },
        }),
        updateUserProfile: builder.query<
            IForumApi['endpoints']['updateUserProfile']['dataResponse'],
            IForumApi['endpoints']['updateUserProfile']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/update_user_profile',
                method: 'POST',
                body: {
                    new_username: bodyRequest.username,
                    new_bio: bodyRequest.bio,
                },
            }),
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
        }),
        sendReportContent: builder.mutation<
            IForumApi['endpoints']['sendReportContent']['dataResponse'],
            IForumApi['endpoints']['sendReportContent']['bodyRequest']
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/report_content',
                method: 'POST',
                body: bodyRequest,
            }),
        }),
    }),
})

export const {
    useGetFilteredPostQuery,
    useGetPostByIdQuery,
    useGetCommentsByPostIdQuery,
    useGetReactionsQuery,
    useReactionPostMutation,
    useReactionCommentMutation,
    useSendReportContentMutation,
    useLazyGetPostByIdQuery,
    useLazyGetCommentByIdQuery,
    useAddCommentQuery,
    useGetCommentByIdQuery,
    useCreatePostQuery,
    useDeleteContentQuery,
    useGetUserInfoQuery,
    useUpdateUserProfileQuery,
} = ForumApi
