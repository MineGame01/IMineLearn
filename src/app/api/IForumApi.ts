import { TAuthUserBio, TAuthUserId, TAuthUsername } from '@entities/LoginModal'
import { IComment, IPost, TPostContent, TPostId, TPostTags, TPostTitle } from '@entities/Post'

/**
 * Quickly define the desired endpoint properties
 *
 * @typeParam R - Request response type
 * @typeParam B - Payload type
 * */
type createEndpoint<R, B> = {
    dataResponse: R
    bodyRequest: B
}

export interface IForumApi {
    endpoints: {
        getUserInfo: createEndpoint<
            {
                username: TAuthUsername
                bio: TAuthUserBio
                is_admin: boolean
                created_at: string
            },
            { user_id: TAuthUserId }
        >
        getFilteredPost: createEndpoint<
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
        >
        getPostById: createEndpoint<IPost, TPostId>
        getCommentsByPostId: createEndpoint<
            IComment[],
            {
                post_id: TPostId
                limit_count?: number
                offset_count?: number
            }
        >
        getReactions: createEndpoint<
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
        >
        addComment: createEndpoint<
            {
                id: TPostId
            },
            {
                post_id: TPostId
                content: TPostContent
            }
        >
        createPost: createEndpoint<
            {
                post_id: TPostId
            },
            {
                title: TPostTitle
                content: TPostContent
                tags: TPostTags[]
            }
        >
        reactionComment: createEndpoint<
            void,
            {
                comment_id: TPostId
                reaction: string
            }
        >
        reactionPost: createEndpoint<
            void,
            {
                post_id: TPostId
                reaction: string
            }
        >
        deleteContent: createEndpoint<void, { target_id: TPostId; target_type: 'comment' | 'post' }>
        updateUserProfile: createEndpoint<
            void,
            {
                username: TAuthUsername
                bio: TAuthUserBio
            }
        >
        getCommentById: createEndpoint<IComment, { comment_id: TPostId }>
        sendReportContent: createEndpoint<
            void,
            {
                target_type: 'post' | 'comment'
                target_id: TPostId
                reason: string
            }
        >
    }
}
