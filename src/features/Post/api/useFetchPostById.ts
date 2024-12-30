import { TPostId } from '@/entities/Post'
import { ForumAPI, useAppFetch } from '@/shared/api'

export const useFetchPostById = (id: TPostId) => {
    const data = useAppFetch(ForumAPI.getPostById, {
        post_id: id,
    })
    return data
}
