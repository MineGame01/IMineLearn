import { FC } from 'react'
import { IComment } from '@entities/Post'
import { CommentInteracting } from './CommentInteracting.tsx'
import { styled, Typography } from '@mui/material'
import { HeadingHidden } from '@shared/ui'
import { CreatorContainer } from '@features/Post/ui/Blocks/CreatorContainer.tsx'
import { UserImage } from '@features/Post/ui/Blocks/UserImage.tsx'
import { UserName } from '@features/Post/ui/Blocks/UserName.tsx'
import { CreateData } from '@features/Post/ui/Blocks/CreateData.tsx'
import { ContentContainer } from '@features/Post/ui/Blocks/ContentContainer.tsx'

const Body = styled('section')({
    padding: '20px',
    display: 'grid',
    gridTemplateAreas: `
    'postCreator postCreator'
    'postContent postContent'
    'postInteracting postInteracting'
    'commentList commentList'`,
    gridTemplateColumns: '1fr 1fr',
})

const Comment: FC<IComment> = ({ id, content, created_at, username }) => {
    return (
        <Body>
            <HeadingHidden>Comment</HeadingHidden>
            <CreatorContainer>
                <UserImage src={null} alt={username} />
                <UserName name={username} />
                <CreateData dataJSON={created_at} />
            </CreatorContainer>
            <ContentContainer>
                <Typography>{content}</Typography>
            </ContentContainer>
            <CommentInteracting id={id} />
        </Body>
    )
}

export default Comment
