import { TPostId } from '@/entities/Post'
import { ForumAPI, useAppFetch } from '@/shared/api'

export const useFetchCommentReactions = (id: TPostId) => {
    const data = useAppFetch(ForumAPI.getReactions, {
        target_type: 'comment',
        target_id: id,
    })
    return data
}
