import { FC, ReactNode } from 'react'

import { styled } from '@mui/material'
import { HeadingHidden } from '@shared/ui'

const Body = styled('section')({
    gridArea: 'postInteracting',
    height: 'auto',
})

export const InteractingContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Body>
            <HeadingHidden>Interacting</HeadingHidden>
            {children}
        </Body>
    )
}
