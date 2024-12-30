import { IComment, IPost, TPostContent, TPostId, TPostTags, TPostTitle } from '@entities/Post'
import { TEndpoint } from '../../API/api/TEndpoint.type'
import { TReactions } from '../../../shared/model/types/TReactions.type'
import {
    IAuthSliceInitialState,
    TAuthUserBio,
    TAuthUserId,
    TAuthUsername,
} from '@/entities/LoginModal'

export interface IGetFilteredPost {
    dataResponses: {
        postArray: IPost[]
        postOnIdArray: (Pick<IPost, 'id'> & {
            username: null
            userimage: null
            created_at: null
            tags: null
            title: null
            content: null
        })[]
    }
    bodyRequest: {
        username_search?: IAuthSliceInitialState['username']
        tags_filter?: TPostTags[]
        filter_user_id?: TAuthUserId
        create_after?: string
        create_before?: string
        post_id?: TPostId
        search?: string
        return_ids_only?: boolean
        limit_count?: number
        offset_count?: number
    }
}

export interface IForumAPI {
    addComment: TEndpoint<
        {
            id: TPostId
        },
        {
            user_id: TAuthUserId
            post_id: TPostId
            content: TPostContent
        }
    >
    createPost: TEndpoint<
        {
            new_post_id: TPostTitle
        },
        {
            user_id: TAuthUserId
            title: TPostTitle
            content: TPostContent
            tags: TPostTags[]
        }
    >
    reactionComment: TEndpoint<
        null,
        {
            user_id: TAuthUserId
            comment_id: TPostId
            reaction: TReactions
        }
    >
    reactionPost: TEndpoint<
        null,
        {
            user_id: TAuthUserId
            post_id: TPostId
            reaction: TReactions
        }
    >
    deletePost: TEndpoint<null, { admin_id: TAuthUserId; post_id: TPostId }>
    getReactions: TEndpoint<
        {
            reaction: string
            name: string
            count: number
        }[],
        {
            target_type: 'post' | 'comment'
            target_id: TPostId
        }
    >
    deleteComment: TEndpoint<null, { admin_id: TAuthUserId; comment_id: TPostId }>
    getFilteredPost: TEndpoint<
        | IGetFilteredPost['dataResponses']['postArray']
        | IGetFilteredPost['dataResponses']['postOnIdArray'],
        IGetFilteredPost['bodyRequest']
    >
    getCommentsByPostId: TEndpoint<
        IComment[],
        {
            post_id_search: TPostId
            limit_count?: number
            offset_count?: number
        }
    >
    getUserInfo: TEndpoint<
        {
            username: TAuthUsername
            bio: TAuthUserBio
            is_admin: boolean
            create_at: string
        },
        { user_id: TAuthUserId }
    >
    updateUserProfile: TEndpoint<
        null,
        {
            user_id: TAuthUserId
            new_username: TAuthUsername
            new_bio: TAuthUserBio
        }
    >
    getCommentById: TEndpoint<IComment, { comment_id: TPostId }>
    reportContent: TEndpoint<
        null,
        {
            user_id: TAuthUserId
            target_type: 'post' | 'content'
            target_id: TPostId
            reason: string
        }
    >
    getPostById: TEndpoint<IPost[], { post_id: TPostId }>
}
