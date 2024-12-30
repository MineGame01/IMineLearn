import React from 'react'

import { Skeleton, Typography } from '@mui/material'
import { useLoadingComponentContext } from '../model/useLoadingComponentContext'

export const UserName: React.FC<{ name: string }> = ({ name }) => {
    const isLoading = useLoadingComponentContext()

    const username = [...name].slice(0, 10).join('') + '...'

    return (
        <Typography variant="subtitle1">
            {isLoading ? <Skeleton width={'100px'} /> : username}
        </Typography>
    )
}
