import { CSSProperties, FC, ReactNode } from 'react'

import { styled } from '@mui/material'
import { HeadingHidden } from '@shared/ui'

const Body = styled('section')({
    gridArea: 'postCreator',
})

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
})

export const CreatorContainer: FC<{
    children: ReactNode
    styleBody?: CSSProperties
    styleContainer?: CSSProperties
    classNameBody?: string
    classNameContainer?: string
}> = ({ classNameBody, classNameContainer, children, styleBody, styleContainer }) => {
    return (
        <Body style={styleBody} className={classNameBody}>
            <HeadingHidden>Creator</HeadingHidden>
            <Container style={styleContainer} className={classNameContainer}>
                {children}
            </Container>
        </Body>
    )
}
