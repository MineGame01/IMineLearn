import { FC } from 'react'
import { styled } from '@mui/material'
import { TPostId } from '@entities/Post'
import { PostPreview } from '@features/Post'

const Container = styled('div')({})

export const PostList: FC<{ postIds: TPostId[] }> = ({ postIds }) => {
    return (
        <Container>
            {postIds.map((postId) => (
                <PostPreview id={postId} />
            ))}
        </Container>
    )
}
