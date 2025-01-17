import { FC } from 'react'

import { Typography, styled } from '@mui/material'

const CreateDataTitle = styled(Typography)(({ theme }) => ({
    gridArea: 'createData',
    color: theme.text.colors.colorMutedText,
    marginLeft: '10px',
}))

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
        <CreateDataTitle variant={'subtitle2'} textAlign={'center'}>
            {timeData}
        </CreateDataTitle>
    )
}
