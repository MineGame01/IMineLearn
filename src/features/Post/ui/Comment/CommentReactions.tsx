import { FC, Fragment, useMemo } from 'react'
import { TPostId } from '@entities/Post'
import { ForumApi, useGetReactionsQuery } from '@/app/api'
import { useAppDispatch } from '@/app/model'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Skeleton, SkeletonTypeMap } from '@mui/material'
import { THandleClickReaction } from '@features/Post/model/THandleClickReaction.ts'
import { Reactions } from '@features/Post/ui/Blocks/Reactions.tsx'

export const CommentReactions: FC<{ commentId: TPostId }> = ({ commentId }) => {
    const { data, isFetching, refetch } = useGetReactionsQuery({
        target_id: commentId,
        target_type: 'comment',
    })
    const dispatch = useAppDispatch()

    const skeletons = useMemo(() => {
        const array: OverridableComponent<SkeletonTypeMap<object, 'span'>>[] = []
        for (let i = 1; i <= 5; i++) {
            array.push(Skeleton)
        }
        return array.map((SkeletonEl, index) => (
            <SkeletonEl
                key={index}
                sx={{ display: 'inline-block', marginLeft: '20px' }}
                variant={'circular'}
                width={35}
                height={35}
            />
        ))
    }, [])

    const handleClickReaction: THandleClickReaction = async (_unused, reaction) => {
        await dispatch(
            ForumApi.endpoints.reactionComment.initiate({ comment_id: commentId, reaction }),
        ).unwrap()
        await dispatch(refetch)
    }

    return (
        <Fragment>
            {data && !isFetching ? (
                <Reactions reactions={data} onReaction={handleClickReaction} />
            ) : isFetching ? (
                skeletons.map((skeletons) => skeletons)
            ) : (
                <div></div>
            )}
        </Fragment>
    )
}
