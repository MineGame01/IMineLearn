import { Input, StyleApp } from '@/shared/ui'
import { Button, Dialog } from '@mui/material'
import React from 'react'

import StyleSCSS from './index.module.scss'
import classNames from 'classnames'

import LoginModalBackgroundPNG from './../assets/designPhotoForum1.png'

export const LoginModal: React.FC = () => {
    return (
        <Dialog
            sx={{
                '.MuiDialog-paper': {
                    backgroundColor: StyleApp.background.colors.colorSecondaryBackground,
                },
            }}
            scroll="body"
            maxWidth={'xl'}
            open={true}
            onClose={() => {}}
        >
            <section className={classNames(StyleSCSS.modalContainer)}>
                <h1 className="hiden">Login modal</h1>
                <div className={classNames(StyleSCSS.modalContainer__formContainer)}>
                    <div className={classNames(StyleSCSS.modalContainer__formContainer__appLogo)}>
                        <h1>IMINELEARN</h1>
                        <span>FORUM</span>
                    </div>
                    <div className={classNames(StyleSCSS.modalContainer__formContainer__form)}>
                        <form>
                            <div>
                                <label htmlFor="input-login-modal-email">Email</label>
                                <br />
                                <Input id="input-login-modal-email" placeholder="Email" />
                            </div>
                            <br />
                            <div>
                                <label htmlFor="input-login-modal-password">Password</label>
                                <br />
                                <Input id="input-login-modal-password" placeholder="Password" />
                            </div>
                            <Button
                                sx={{
                                    fontWeight: '600',
                                    textTransform: 'none',
                                    width: '100%',
                                    marginTop: '20px',
                                    backgroundColor: StyleApp.text.colors.colorAccent,
                                }}
                                variant="contained"
                                type="submit"
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
                <div className={classNames(StyleSCSS.modalContainer__Background)}>
                    <img src={LoginModalBackgroundPNG} alt="Background" />
                </div>
            </section>
        </Dialog>
    )
}
