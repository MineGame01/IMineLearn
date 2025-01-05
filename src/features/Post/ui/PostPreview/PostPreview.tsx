import { FC } from 'react'
import { TPostId } from '@entities/Post'
import { useGetPostByIdQuery } from '@/app/api'
import { CreatorContainer } from '@features/Post/ui/Blocks/CreatorContainer.tsx'
import { UserImage } from '@features/Post/ui/Blocks/UserImage.tsx'
import { UserName } from '@features/Post/ui/Blocks/UserName.tsx'
import { ContentContainer } from '@features/Post/ui/Blocks/ContentContainer.tsx'
import { Title } from '@features/Post/ui/Blocks/Title.tsx'
import { Button, styled } from '@mui/material'

const Body = styled(Button)(({ theme }) => ({
    backgroundColor: theme.background.colors.colorSecondaryBackground,
    border: `1.5px solid ${theme.border.colors.colorBorder}`,

    display: 'flex',
    width: '100%',
    justifyContent: 'start',
    color: 'initial',
    textTransform: 'none',
}))

export const PostPreview: FC<{ id: TPostId }> = ({ id }) => {
    const { data: postData, error: postError } = useGetPostByIdQuery(id)

    if (postData && !postError) {
        const { title, userimage, username } = postData

        return (
            <Body href={'#'}>
                <CreatorContainer>
                    <UserImage src={userimage} alt={username} />
                    <UserName name={username} />
                </CreatorContainer>
                <ContentContainer style={{ display: 'flex', alignItems: 'center' }}>
                    <Title sx={{ fontSize: '1.2rem' }}>{title}</Title>
                </ContentContainer>
            </Body>
        )
    }
}
