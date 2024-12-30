import React from 'react'

import classNames from 'classnames'

import StyleCSS from './index.module.scss'

import { HeaderLogo } from './HeaderLogo'

export const Header: React.FC = () => {
    return (
        <header className={classNames(StyleCSS.header)}>
            <div className={classNames(StyleCSS.headerContainer, 'container')}>
                <HeaderLogo />
            </div>
        </header>
    )
}
