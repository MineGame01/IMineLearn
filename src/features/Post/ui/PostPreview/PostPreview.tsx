import { FC } from 'react'
import { TPostId } from '@entities/Post'
import { useGetPostByIdQuery } from '@/app/api'
import { CreatorContainer } from '@features/Post/ui/Blocks/CreatorContainer.tsx'
import { UserImage } from '@features/Post/ui/Blocks/UserImage.tsx'
import { UserName } from '@features/Post/ui/Blocks/UserName.tsx'
import { ContentContainer } from '@features/Post/ui/Blocks/ContentContainer.tsx'
import { Title } from '@features/Post/ui/Blocks/Title.tsx'
import { Box, Button, styled } from '@mui/material'
import { Tag } from '@shared/ui'

const Body = styled(Button)({
    display: 'flex',
    width: '100%',
    justifyContent: 'start',
    color: 'initial',
    textTransform: 'none',
})

const ContentContainerStyle = styled(ContentContainer)({
    display: 'flex',
    alignItems: 'center',
})

export const PostPreview: FC<{ id: TPostId }> = ({ id }) => {
    const { data: postData } = useGetPostByIdQuery(id)

    if (postData) {
        const { title, userimage, username, tags } = postData

        return (
            <Body href={'#'}>
                <CreatorContainer>
                    <UserImage src={userimage} alt={username} />
                    <UserName name={username} />
                </CreatorContainer>
                <ContentContainerStyle>
                    <Title sx={{ fontSize: '1.2rem' }}>{title}</Title>
                    {tags.map((tag, index) => (
                        <Box key={index} sx={{ marginLeft: '10px' }}>
                            <Tag tag={tag} />
                        </Box>
                    ))}
                </ContentContainerStyle>
            </Body>
        )
    }
}
