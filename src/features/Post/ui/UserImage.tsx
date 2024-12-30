import React from 'react'

import DefaultUserIcon from './defaultUser.png'
import { TPostUserimage, TPostUsername } from '@/entities/Post'
import { Avatar } from '@mui/material'
import { useLoadingComponentContext } from '../model/useLoadingComponentContext'
import { Skeleton } from '@mui/material'

export const UserImage: React.FC<{
    src: TPostUserimage | null | undefined
    alt: TPostUsername
}> = ({ src, alt }) => {
    const isLoading = useLoadingComponentContext()

    return (
        <React.Fragment>
            {isLoading ? (
                <Skeleton sx={{ borderRadius: '50%', width: '65px', height: '100px' }} />
            ) : (
                <Avatar
                    src={src ?? DefaultUserIcon}
                    alt={alt}
                    sx={{ width: '70px', height: 'auto', padding: '10px' }}
                />
            )}
        </React.Fragment>
    )
}
