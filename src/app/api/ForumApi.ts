import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SUPABASE_KEY, SUPABASE_URL } from '@/app/api/supabaseClient.ts'
import { TAuthUserBio, TAuthUserId, TAuthUsername } from '@entities/LoginModal'
import { IComment, IPost, TPostContent, TPostId, TPostTags, TPostTitle } from '@entities/Post'
import { selectAuthAccessToken } from '@widgets/LoginModal'
import { TState } from '@/app/model'

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
            IPost[] | TPostId[],
            {
                username?: TAuthUsername
                tags_filter?: TPostTags[]
                user_id?: TAuthUserId
                create_after?: string
                create_before?: string
                post_id?: TPostId
                search?: string
                return_ids_only?: boolean
                limit_count?: number
                offset_count?: number
            }
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
        getPostById: builder.query<IPost, TPostId>({
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
            IComment[],
            {
                post_id: TPostId
                limit_count?: number
                offset_count?: number
            }
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
            {
                reaction: string
                name: string
                count: number
                user_reacted: boolean
            }[],
            {
                target_type: 'post' | 'comment'
                target_id: TPostId
            }
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/get_reactions',
                method: 'POST',
                body: bodyRequest,
            }),
        }),
        addComment: builder.query<
            {
                id: TPostId
            },
            {
                post_id: TPostId
                content: TPostContent
            }
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/add_comment',
                method: 'POST',
                body: bodyRequest,
            }),
        }),
        createPost: builder.query<
            {
                post_id: TPostId
            },
            {
                title: TPostTitle
                content: TPostContent
                tags: TPostTags[]
            }
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
            void,
            {
                comment_id: TPostId
                reaction: string
            }
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
            void,
            {
                post_id: TPostId
                reaction: string
            }
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
        deleteContent: builder.query<void, { target_id: TPostId; target_type: 'comment' | 'post' }>(
            {
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
            },
        ),
        getUserInfo: builder.query<
            {
                username: TAuthUsername
                bio: TAuthUserBio
                is_admin: boolean
                created_at: string
            },
            { user_id: TAuthUserId }
        >({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/get_user_info',
                method: 'POST',
                body: bodyRequest,
            }),
            transformResponse: (
                dataResponse: {
                    username: TAuthUsername
                    bio: TAuthUserBio
                    is_admin: boolean
                    created_at: string
                }[],
            ) => {
                return dataResponse[0]
            },
        }),
        updateUserProfile: builder.query<
            void,
            {
                username: TAuthUsername
                bio: TAuthUserBio
            }
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
        getCommentById: builder.query<IComment, { comment_id: TPostId }>({
            query: (bodyRequest) => ({
                url: '/rest/v1/rpc/get_comment_by_id',
                method: 'POST',
                body: bodyRequest,
            }),
        }),
        sendReportContent: builder.query<
            void,
            {
                target_type: 'post' | 'content'
                target_id: TPostId
                reason: string
            }
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
    useAddCommentQuery,
    useGetCommentByIdQuery,
    useCreatePostQuery,
    useDeleteContentQuery,
    useGetUserInfoQuery,
    useUpdateUserProfileQuery,
    useSendReportContentQuery,
} = ForumApi
