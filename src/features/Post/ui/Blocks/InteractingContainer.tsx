import { FC, ReactNode } from 'react'

import { styled } from '@mui/material'
import { HeadingHidden } from '@shared/ui'

const Body = styled('section')(({ theme }) => ({
    gridArea: 'postInteracting',
    height: 'auto',
    borderTop: `1.5px solid ${theme.border.colors.colorBorder}`,
}))

export const InteractingContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Body>
            <HeadingHidden>Interacting</HeadingHidden>
            {children}
        </Body>
    )
}
