import { FC } from 'react'

import { Typography } from '@mui/material'

export const CreateData: FC<{
    dataJSON: string
}> = ({ dataJSON }) => {
    const date = new Date(dataJSON)
    const timeData = date.toLocaleString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    return (
        <Typography variant={'subtitle2'} textAlign={'center'}>
            {timeData}
        </Typography>
    )
}
