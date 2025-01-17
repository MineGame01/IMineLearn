import { Button, FormHelperText, FormLabel, styled, Typography } from '@mui/material'
import { Input } from '@shared/ui'
import React, { ChangeEvent, FC, Fragment, useState } from 'react'
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts'
import { useAppDispatch, useAppSelector } from '@/app/model'
import { authLogin, selectAuthError, selectAuthIsLoading } from '@widgets/LoginModal'

const Form = styled('form')(({ theme }) => ({
    label: {
        color: theme.text.colors.colorMutedText,
        fontWeight: 600,
    },
}))

const ButtonSubmitAuth = styled(Button)({
    fontWeight: '600',
    textTransform: 'none',
    width: '100%',
    marginTop: '20px',
})

const IS_EMAIL_REQUIRED = true
const IS_PASSWORD_REQUIRED = true

export const AuthForm: FC<{
    typeAuth: TTypeAuth
}> = ({ typeAuth }) => {
    const authError = useAppSelector(selectAuthError)
    const authIsLoading = useAppSelector(selectAuthIsLoading)
    const isAuthError = Boolean(authError)

    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleChangeState = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        <Fragment>
            <Form onSubmit={handleSubmitAuth}>
                <div>
                    <FormLabel
                        error={isAuthError}
                        htmlFor={'input-login-modal-email'}
                        required={IS_EMAIL_REQUIRED}
                    >
                        Email
                    </FormLabel>
                    <br />
                    <Input
                        value={email}
                        onChange={(event) => handleChangeState(event, 'email')}
                        id="input-login-modal-email"
                        placeholder="Email"
                        type="email"
                        required={IS_EMAIL_REQUIRED}
                        error={isAuthError}
                    />
                    {isAuthError && (
                        <FormHelperText error={isAuthError}>
                            Please check that your email is correct
                        </FormHelperText>
                    )}
                </div>
                <br />
                <div>
                    <FormLabel
                        error={isAuthError}
                        htmlFor="input-login-modal-password"
                        required={IS_PASSWORD_REQUIRED}
                    >
                        Password
                    </FormLabel>
                    <br />
                    <Input
                        value={password}
                        onChange={(event) => handleChangeState(event, 'password')}
                        id="input-login-modal-password"
                        placeholder="Password"
                        type="password"
                        required={IS_PASSWORD_REQUIRED}
                        error={isAuthError}
                    />
                    {isAuthError && (
                        <FormHelperText error={isAuthError}>
                            Please check your password
                        </FormHelperText>
                    )}
                </div>
                <ButtonSubmitAuth variant="contained" type="submit" disabled={authIsLoading}>
                    {typeAuth[0].toUpperCase() + typeAuth.slice(1)}
                </ButtonSubmitAuth>
            </Form>
            {isAuthError && (
                <Typography textAlign={'center'} color={'red'} marginTop={'10px'}>
                    {authError}
                </Typography>
            )}
        </Fragment>
    )
}
