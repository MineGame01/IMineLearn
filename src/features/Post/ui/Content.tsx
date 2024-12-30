import React from 'react'

import PostSCSSModule from './index.module.scss'
import classNames from 'classnames'

export const Content: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <section
            className={classNames(
                PostSCSSModule.post__content,
                PostSCSSModule.post__contentContainer,
            )}
        >
            {children}
        </section>
    )
}
