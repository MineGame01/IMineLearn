import React from 'react'

import PostSCSSModule from './index.module.scss'
import classNames from 'classnames'

export const InteractingListButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ul className={classNames(PostSCSSModule.post__interacting__listButton)}>{children}</ul>
}
