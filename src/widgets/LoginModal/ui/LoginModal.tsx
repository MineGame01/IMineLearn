import { HeadingHidden } from '@/shared/ui'
import { LinearProgress, ModalProps } from '@mui/material'
import { useState, FC } from 'react'
import LoginModalBackgroundPNG from './../assets/designPhotoForum1.png'
import { useAppSelector } from '@/app/model'
import { selectAuthIsLoading } from '@widgets/LoginModal'
import { LoginDialog } from '@widgets/LoginModal/ui/LoginDialog.tsx'
import { ModalContainer } from '@widgets/LoginModal/ui/ModalContainer.tsx'
import { AuthContainer } from '@widgets/LoginModal/ui/AuthContainer.tsx'
import { AppLogo } from '@widgets/LoginModal/ui/AppLogo.tsx'
import { FormContainer } from '@widgets/LoginModal/ui/FormContainer.tsx'
import { AuthForm } from '@widgets/LoginModal/ui/AuthForm.tsx'
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts'
import { ButtonChangeTypeAuth } from '@widgets/LoginModal/ui/ButtonChangeTypeAuth.tsx'
import { ModalBackground } from '@widgets/LoginModal/ui/ModalBackground.tsx'
import { GreetingUser } from '@widgets/LoginModal/ui/GreetingUser.tsx'

export const LoginModal: FC<{
    isOpen: ModalProps['open']
    onClose: ModalProps['onClose']
}> = ({ isOpen, onClose }) => {
    const [typeAuth, setTypeAuth] = useState<TTypeAuth>('login')

    const authIsLoading = useAppSelector(selectAuthIsLoading)

    return (
        <LoginDialog maxWidth={'xl'} open={isOpen} onClose={onClose}>
            <ModalContainer>
                <HeadingHidden id={'login-modal-title'}>Login modal</HeadingHidden>
                <AuthContainer typeAuth={typeAuth}>
                    <AppLogo />
                    <GreetingUser typeAuth={typeAuth} />
                    <FormContainer>
                        <AuthForm typeAuth={typeAuth} />
                        {authIsLoading && <LinearProgress sx={{ marginTop: '10px' }} />}
                        <ButtonChangeTypeAuth
                            typeAuth={typeAuth}
                            onClickChangeTypeAuth={() => {
                                setTypeAuth(typeAuth === 'registration' ? 'login' : 'registration')
                            }}
                        />
                    </FormContainer>
                </AuthContainer>
                <ModalBackground typeAuth={typeAuth}>
                    <img src={LoginModalBackgroundPNG} alt="Background" />
                </ModalBackground>
            </ModalContainer>
        </LoginDialog>
    )
}
