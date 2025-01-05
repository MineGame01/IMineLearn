import React from 'react'

import DefaultUserIcon from '../../assets/defaultUser.png'
import { TPostUserimage, TPostUsername } from '@entities/Post'
import { Avatar } from '@mui/material'

export const UserImage: React.FC<{
    src: TPostUserimage | null | undefined
    alt: TPostUsername
}> = ({ src, alt }) => {
    return (
        <React.Fragment>
            <Avatar
                src={src ?? DefaultUserIcon}
                alt={alt}
                sx={{ width: '70px', height: 'auto', padding: '10px' }}
            />
        </React.Fragment>
    )
}
