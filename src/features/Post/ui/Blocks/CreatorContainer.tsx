import { FC, ReactNode } from 'react'

import { styled } from '@mui/material'
import { HeadingHidden } from '@shared/ui'

const Body = styled('section')({
    gridArea: 'postCreator',
})

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

export const CreatorContainer: FC<{
    classNameBody?: string
    classNameContainer?: string
    children: ReactNode
}> = ({ classNameBody, classNameContainer, children }) => {
    return (
        <Body className={classNameBody}>
            <HeadingHidden>Title Post</HeadingHidden>
            <Container className={classNameContainer}>{children}</Container>
        </Body>
    )
}
