import { Input, StyleApp } from '@/shared/ui'
import { Button, Dialog, FormHelperText, LinearProgress, ModalProps } from '@mui/material'
import React, { useState } from 'react'
import StyleSCSS from './index.module.scss'
import classNames from 'classnames'
import LoginModalBackgroundPNG from './../assets/designPhotoForum1.png'
import { useAppDispatch, useAppSelector } from '@/app/model'
import { authLogin, selectAuthError, selectAuthLoading } from '@widgets/LoginModal'

export const LoginModal: React.FC<{
    isOpen: ModalProps['open']
    onClose: ModalProps['onClose']
}> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [typeAuth, setTypeAuth] = useState<'login' | 'registration'>('login')

    const dispatch = useAppDispatch()
    const authIsLoading = useAppSelector(selectAuthLoading)
    const authError = useAppSelector(selectAuthError)

    const handleChangeState = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        typeChange: 'email' | 'password',
    ) => {
        const valueInput = event.currentTarget.value

        switch (typeChange) {
            case 'email': {
                setEmail(valueInput)
                return
            }
            case 'password': {
                setPassword(valueInput)
                return
            }
        }
    }

    const handleSubmitAuth: React.FormEventHandler = (event) => {
        event.preventDefault()

        switch (typeAuth) {
            case 'login': {
                dispatch(authLogin(email, password, 'login'))
                return
            }
            case 'registration': {
                dispatch(authLogin(email, password, 'registration'))
                return
            }
        }
    }

    return (
        <Dialog
            sx={{
                '.MuiDialog-paper': {
                    overflow: 'hidden',
                    backgroundColor: StyleApp.background.colors.colorSecondaryBackground,
                },
            }}
            aria-labelledby={'login-modal-title'}
            aria-describedby={'login-modal-form'}
            maxWidth={'xl'}
            open={isOpen}
            onClose={onClose}
        >
            <section className={classNames(StyleSCSS.modalContainer)}>
                <h1 className="hiden" id={'login-modal-title'}>
                    Login modal
                </h1>
                <div
                    className={classNames(StyleSCSS.modalContainer__formContainer, {
                        [StyleSCSS.modalContainer__formContainerRight]: typeAuth === 'registration',
                    })}
                    id={'login-modal-form'}
                >
                    <div className={classNames(StyleSCSS.modalContainer__formContainer__appLogo)}>
                        <h1>IMINELEARN</h1>
                        <span>FORUM</span>
                    </div>
                    <div className={classNames(StyleSCSS.modalContainer__formContainer__form)}>
                        <form onSubmit={handleSubmitAuth}>
                            <div>
                                <label htmlFor="input-login-modal-email">Email</label>
                                <br />
                                <Input
                                    value={email}
                                    onChange={(event) => handleChangeState(event, 'email')}
                                    id="input-login-modal-email"
                                    placeholder="Email"
                                    type="email"
                                    required
                                />
                            </div>
                            <br />
                            <div>
                                <label htmlFor="input-login-modal-password">Password</label>
                                <br />
                                <Input
                                    value={password}
                                    onChange={(event) => handleChangeState(event, 'password')}
                                    id="input-login-modal-password"
                                    placeholder="Password"
                                    type="password"
                                    required
                                />
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
                                disabled={authIsLoading}
                            >
                                {typeAuth[0].toUpperCase() + typeAuth.slice(1)}
                            </Button>
                        </form>
                        {authError && (
                            <FormHelperText
                                sx={{ textAlign: 'center', marginTop: '10px', color: 'red' }}
                            >
                                {authError}
                            </FormHelperText>
                        )}
                        {authIsLoading && <LinearProgress sx={{ marginTop: '10px' }} />}
                        <Button
                            onClick={() => {
                                setTypeAuth((prevTypeAuth) =>
                                    prevTypeAuth === 'login' ? 'registration' : 'login',
                                )
                            }}
                            sx={{ textTransform: 'none', marginTop: '10px' }}
                            disabled={authIsLoading}
                        >
                            {typeAuth === 'registration'
                                ? 'Do you have an account?'
                                : "Don't have an account?"}
                        </Button>
                    </div>
                </div>
                <div
                    className={classNames(StyleSCSS.modalContainer__Background, {
                        [StyleSCSS.modalContainer__BackgroundLeft]: typeAuth === 'registration',
                    })}
                >
                    <img src={LoginModalBackgroundPNG} alt="Background" />
                </div>
            </section>
        </Dialog>
    )
}
