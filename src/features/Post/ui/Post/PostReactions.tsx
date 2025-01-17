import { FC } from 'react'
import { Reactions } from '@features/Post/ui/Blocks/Reactions.tsx'
import { TPostId } from '@entities/Post'
import { useGetReactionsQuery, useReactionPostMutation } from '@/app/api'
import { THandleClickReaction } from '@features/Post/model/THandleClickReaction.ts'
import { useAppSelector } from '@/app/model'
import { selectAuthUserId } from '@widgets/LoginModal'

export const PostReactions: FC<{ postId: TPostId }> = ({ postId }) => {
    const { data, isFetching, refetch } = useGetReactionsQuery({
        target_id: postId,
        target_type: 'post',
    })
    const [reactionPost] = useReactionPostMutation()
    const authUserId = useAppSelector(selectAuthUserId)

    const handleClickReaction: THandleClickReaction = async (_unused, reaction) => {
        try {
            if (authUserId) {
                await reactionPost({ post_id: postId, reaction }).unwrap()
                refetch()
            }
        } catch (err) {
            console.error('Error sending reaction post', err)
        }
    }

    if (data) {
        return (
            <Reactions reactions={data} onReaction={handleClickReaction} isLoading={isFetching} />
        )
    } else {
        return <div></div>
    }
}
