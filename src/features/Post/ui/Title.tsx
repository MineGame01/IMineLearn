import { TPostTitle } from '@/entities/Post'
import classNames from 'classnames'
import React from 'react'
import { useLoadingComponentContext } from '../model/useLoadingComponentContext'
import { Skeleton } from '@mui/material'

export const Title: React.FC<{
    title: TPostTitle
    className?: string
}> = ({ title, className }) => {
    const isLoading = useLoadingComponentContext()

    return <h1 className={classNames(className)}>{isLoading ? <Skeleton /> : title}</h1>
}
