import { Fragment, FC, useState } from 'react'
import { TPostId } from '@entities/Post'
import { Title } from '../Blocks/Title.tsx'
import { UserImage } from '../Blocks/UserImage.tsx'
import { UserName } from '../Blocks/UserName.tsx'
import { CreateData } from '../Blocks/CreateData.tsx'
import { PostInteracting } from './PostInteracting.tsx'
import { styled, Typography } from '@mui/material'
import { useGetPostByIdQuery } from '@/app/api'
import { PostComments } from '@features/Post/ui/Post/PostComments.tsx'
import { HeadingHidden } from '@shared/ui'
import { ContentContainer } from '@features/Post/ui/Blocks/ContentContainer.tsx'
import { CreatorContainer } from '@features/Post/ui/Blocks/CreatorContainer.tsx'

export const Body = styled('article')(({ theme }) => ({
    backgroundColor: theme.background.colors.colorSecondaryBackground,
    border: `1.5px solid ${theme.border.colors.colorBorder}`,

    display: 'grid',
    gridTemplateAreas: `
    'postCreator postContent'
    'postInteracting postInteracting'
    'commentList commentList'`,
    gridTemplateColumns: '10% 1fr',
}))

export const Post: FC<{ id: TPostId }> = ({ id }) => {
    const { data: postData, error: postError } = useGetPostByIdQuery(id)

    const [isShowComments, setIsShowComments] = useState(false)

    if (postData && !postError) {
        const { title, userimage, username, created_at, content } = postData

        return (
            <Body>
                <HeadingHidden>Post</HeadingHidden>
                <CreatorContainer>
                    <UserImage src={userimage} alt={username} />
                    <UserName name={username} />
                    <CreateData dataJSON={created_at} />
                </CreatorContainer>
                <ContentContainer>
                    <Title>{title}</Title>
                    <div>
                        <Typography>{content}</Typography>
                    </div>
                </ContentContainer>
                <Fragment>
                    <PostInteracting
                        postId={id}
                        isShowComments={isShowComments}
                        setIsShowComments={setIsShowComments}
                    />
                    <PostComments postId={id} isShowComments={isShowComments} />
                </Fragment>
            </Body>
        )
    }
}
