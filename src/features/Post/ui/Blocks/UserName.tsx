import React from 'react'

import { Typography } from '@mui/material'

export const UserName: React.FC<{ name: string }> = ({ name }) => {
    const username = [...name].slice(0, 10).join('')

    return (
        <Typography variant="subtitle1">
            {username.length < 10 ? username : username + '...'}
        </Typography>
    )
}
