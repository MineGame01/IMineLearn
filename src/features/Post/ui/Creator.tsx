import React from 'react'

import PostSCSSModule from './index.module.scss'
import classNames from 'classnames'

export const Creator: React.FC<{
    title?: string
    classNameBody?: string
    classNameContainer?: string
    children: React.ReactNode
}> = ({ title = 'Creator', classNameBody, classNameContainer, children }) => {
    return (
        <section className={classNames(PostSCSSModule.post__creator, classNameBody)}>
            <h1 className="hiden">{title}</h1>
            <div className={classNames(PostSCSSModule.post__creatorContainer, classNameContainer)}>
                {children}
            </div>
        </section>
    )
}
