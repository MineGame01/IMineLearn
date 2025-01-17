import { FC, useState } from 'react'
import { HeadingHidden } from '@shared/ui'
import { AuthContainer } from '@widgets/LoginModal/ui/AuthContainer.tsx'
import { AppLogo } from '@widgets/LoginModal/ui/AppLogo.tsx'
import { GreetingUser } from '@widgets/LoginModal/ui/GreetingUser.tsx'
import { FormContainer } from '@widgets/LoginModal/ui/FormContainer.tsx'
import { AuthForm } from '@widgets/LoginModal/ui/AuthForm.tsx'
import { LinearProgress } from '@mui/material'
import { ButtonChangeTypeAuth } from '@widgets/LoginModal/ui/ButtonChangeTypeAuth.tsx'
import { ModalBackground } from '@widgets/LoginModal/ui/ModalBackground.tsx'
import LoginModalBackgroundPNG from '@widgets/LoginModal/assets/designPhotoForum1.png'
import { ModalContainer } from '@widgets/LoginModal/ui/ModalContainer.tsx'
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts'
import { useAppSelector } from '@/app/model'
import { selectAuthIsLoading } from '@widgets/LoginModal'

const ContentModal: FC = () => {
    const [typeAuth, setTypeAuth] = useState<TTypeAuth>('login')

    const authIsLoading = useAppSelector(selectAuthIsLoading)

    return (
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
    )
}

export default ContentModal
