import React from 'react'

import classNames from 'classnames'

import StyleCSS from './index.module.scss'

export const HeaderLogo: React.FC = () => {
    return (
        <div
            className={classNames(
                StyleCSS.headerContainer__logo,
                StyleCSS.headerContainer__logoContainer,
            )}
        >
            <a href="#">IMineLearn</a>
        </div>
    )
}
