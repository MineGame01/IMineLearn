import { TPostId } from '@/entities/Post'
import { ForumAPI, useAppFetch } from '@/shared/api'

export const useFetchCommentsByPostId = (id: TPostId) => {
    const data = useAppFetch(ForumAPI.getCommentsByPostId, {
        post_id_search: id,
    })
    return data
}
