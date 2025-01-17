import { FC } from 'react'
import { styled, Typography } from '@mui/material'
import { HiHashtag } from 'react-icons/hi2'
import { TPostTags } from '@entities/Post'

const Body = styled('div')(({ theme }) => ({
    backgroundColor: theme.background.colors.colorSecondaryBackground,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 17px 5px 8px',
    borderRadius: '50px',
}))

export const Tag: FC<{ tag: TPostTags[0] }> = ({ tag }) => {
    return (
        <Body>
            <HiHashtag size={'20px'} />
            <Typography marginLeft={'7px'} display={'inline'} variant={'body2'}>
                {tag}
            </Typography>
        </Body>
    )
}
