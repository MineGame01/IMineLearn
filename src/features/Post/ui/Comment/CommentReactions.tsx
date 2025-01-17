import { FC } from 'react'
import { TPostId } from '@entities/Post'
import { useGetReactionsQuery, useReactionCommentMutation } from '@/app/api'
import { useAppSelector } from '@/app/model'
import { THandleClickReaction } from '@features/Post/model/THandleClickReaction.ts'
import { Reactions } from '@features/Post/ui/Blocks/Reactions.tsx'
import { selectAuthUserId } from '@widgets/LoginModal'

export const CommentReactions: FC<{ commentId: TPostId }> = ({ commentId }) => {
    const { data, isFetching, refetch } = useGetReactionsQuery({
        target_id: commentId,
        target_type: 'comment',
    })
    const [reactionComment] = useReactionCommentMutation()
    const authUserId = useAppSelector(selectAuthUserId)

    const handleClickReaction: THandleClickReaction = async (_unused, reaction) => {
        try {
            if (authUserId) {
                await reactionComment({ comment_id: commentId, reaction }).unwrap()
                refetch()
            }
        } catch (err) {
            console.error('Error sending reaction comment', err)
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
