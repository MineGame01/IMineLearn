import { ForumAPI, useAppFetch } from '@shared/api'
import { IGetFilteredPost } from '@entities/ForumAPI'

export const useFecthSearchPost = () => {
    return useAppFetch<
        IGetFilteredPost['dataResponses']['postOnIdArray'],
        typeof ForumAPI.getFilteredPost
    >(ForumAPI.getFilteredPost, {
        search: 'T',
        return_ids_only: true,
    })
}