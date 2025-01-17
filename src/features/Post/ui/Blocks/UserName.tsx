import React from 'react'

import { Typography, styled } from '@mui/material'

const UserNameTitle = styled(Typography)({
    gridArea: 'userName',
    fontWeight: '600',
})

export const UserName: React.FC<{ name: string }> = ({ name }) => {
    const username = [...name].slice(0, 10).join('')

    return (
        <UserNameTitle variant="subtitle1">
            {username.length < 10 ? username : username + '...'}
        </UserNameTitle>
    )
}
