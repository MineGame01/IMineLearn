import { FC } from 'react'
import { styled } from '@mui/material'
import { HeadingHidden } from '@shared/ui'
import { useGetCommentsByPostIdQuery } from '@/app/api'
import { TPostId } from '@entities/Post'
import { Comment } from '@features/Post/ui/Comment/Comment.tsx'

const Body = styled('section')({
    gridArea: 'commentList',
    padding: '5px',
})

export const PostComments: FC<{ postId: TPostId; isShowComments: boolean }> = ({
    postId,
    isShowComments,
}) => {
    const { data: commentsData, error: commentsError } = useGetCommentsByPostIdQuery({
        post_id: postId,
    })

    if (!isShowComments) {
        return undefined
    }

    return (
        <Body>
            <HeadingHidden>Comments Post</HeadingHidden>
            {commentsData &&
                !commentsError &&
                commentsData.map((comment) => {
                    return <Comment key={comment.id} {...comment} />
                })}
        </Body>
    )
}
