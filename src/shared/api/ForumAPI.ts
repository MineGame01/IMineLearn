import { IForumAPI } from '../../entities/ForumAPI/api/IForumAPI.type'
import { createEndpoint } from './createEndpoint'

export const ForumAPI: IForumAPI = {
    addComment: createEndpoint('/rest/v1/rpc/add_comment'),
    createPost: createEndpoint('/rest/v1/rpc/create_post'),
    reactionComment: createEndpoint('/rest/v1/rpc/add_or_update_comment_reaction'),
    reactionPost: createEndpoint('/rest/v1/rpc/add_or_update_post_reaction'),
    deletePost: createEndpoint('/rest/v1/rpc/delete_post_admin'),
    deleteComment: createEndpoint('/rest/v1/rpc/delete_comment_admin'),
    getFilteredPost: createEndpoint('/rest/v1/rpc/get_filtered_posts'),
    getCommentsByPostId: createEndpoint('/rest/v1/rpc/get_comments_by_post_id'),
    getUserInfo: createEndpoint('/rest/v1/rpc/get_user_info'),
    updateUserProfile: createEndpoint('/rest/v1/rpc/update_user_profile'),
    getCommentById: createEndpoint('/rest/v1/rpc/get_comment_by_id'),
    reportContent: createEndpoint('/rest/v1/rpc/report_content'),
    getReactions: createEndpoint('/rest/v1/rpc/get_reactions'),
    getPostById: createEndpoint('/rest/v1/rpc/get_post_by_id'),
}
