import React from 'react'

import PostSCSSModule from './index.module.scss'
import classNames from 'classnames'

export const Interacting: React.FC<{ children: React.ReactNode; type: 'post' | 'comment' }> = ({
    children,
    type,
}) => {
    return (
        <section className={classNames(PostSCSSModule.post__interacting)}>
            <h1 className="hiden">Interacting with the {type}</h1>
            {children}
        </section>
    )
}
