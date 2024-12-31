import React, { useState } from 'react'
import classNames from 'classnames'
import StyleCSS from './index.module.scss'
import { HeaderLogo } from './HeaderLogo'
import { Button } from '@mui/material'
import { useAppSelector } from '@/app/model'
import { LoginModal, selectAuthAccessToken } from '@widgets/LoginModal'

export const Header: React.FC = () => {
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

    const authAccessToken = useAppSelector(selectAuthAccessToken);

    const handleClickOpenLoginModal: React.MouseEventHandler = (_unused) => {
        setIsOpenLoginModal(true)
    }

    return (
        <header className={classNames(StyleCSS.header)}>
            <div className={classNames(StyleCSS.headerContainer, 'container')}>
                <HeaderLogo />
                <Button disabled={Boolean(authAccessToken)} onClick={handleClickOpenLoginModal}>{authAccessToken ? "Logined" : "Login"}</Button>
                <LoginModal isOpen={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)}  />
            </div>
        </header>
    )
}
