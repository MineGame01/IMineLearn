import { FC, HTMLAttributes, ReactNode } from 'react'
import { styled } from '@mui/material'
import { HeadingHidden } from '@shared/ui'

export const Body = styled('section')({
    gridArea: 'postContent',
    height: '100%',
})

const Wrapper = styled('div')({
    padding: '15px',
})

interface Props extends HTMLAttributes<HTMLElement> {
    children: ReactNode
}

export const ContentContainer: FC<Props> = ({ children, ...props }) => {
    return (
        <Body {...props}>
            <HeadingHidden>Content</HeadingHidden>
            <Wrapper>{children}</Wrapper>
        </Body>
    )
}
