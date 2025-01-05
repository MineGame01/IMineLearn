import { styled } from '@mui/material'
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts'

export const AuthContainer = styled('div')(({ typeAuth }: { typeAuth: TTypeAuth }) => ({
    maxWidth: '500px',
    padding: '30px',
    position: 'relative',
    transition: 'transform 0.2s ease',
    transform: typeAuth === 'registration' ? 'translateX(100%)' : 'none',
}))

AuthContainer.defaultProps = {
    id: 'login-modal-form',
    typeAuth: 'login',
}
