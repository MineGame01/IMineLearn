import React from 'react'

import DefaultUserIcon from '../../assets/defaultUser.png'
import { TPostUserimage, TPostUsername } from '@entities/Post'
import { Avatar, styled } from '@mui/material'

const UserIcon = styled(Avatar)({
    gridArea: 'userImage',
})

export const UserImage: React.FC<{
    src: TPostUserimage | null | undefined
    alt: TPostUsername
}> = ({ src, alt }) => {
    return (
        <UserIcon
            variant={'circular'}
            src={src ?? DefaultUserIcon}
            alt={alt}
            sx={{ width: '60px', height: 'auto', margin: '10px' }}
        />
    )
}
