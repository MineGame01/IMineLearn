import React from 'react'

import { Skeleton, Typography } from '@mui/material'
import { useLoadingComponentContext } from '../model/useLoadingComponentContext'

export const CreateData: React.FC<{
    dataJSON: string
}> = ({ dataJSON }) => {
    const isLoading = useLoadingComponentContext()

    const date = new Date(dataJSON)
    const timeData = date.toLocaleString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    return (
        <Typography variant={'subtitle2'}>
            {isLoading ? <Skeleton width={'100px'} height={'30px'} /> : timeData}
        </Typography>
    )
}
