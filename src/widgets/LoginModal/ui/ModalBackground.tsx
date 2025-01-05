import { styled } from '@mui/material'
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts'

export const ModalBackground = styled('div')(({ typeAuth }: { typeAuth: TTypeAuth }) => ({
    position: 'relative',
    transition: 'transform 0.2s ease',
    transform: typeAuth === 'registration' ? 'translateX(-100%)' : 'none',
    img: {
        maxWidth: '500px',
        height: '100%',
    },
}))
