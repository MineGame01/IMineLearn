import { ModalProps } from '@mui/material'
import { FC, lazy, memo, Suspense } from 'react'
import { LoginDialog } from '@widgets/LoginModal/ui/LoginDialog.tsx'

const ContentModal = lazy(() => import('./ContentModal.tsx'))

export const LoginModal: FC<{
    isOpen: ModalProps['open']
    onClose: ModalProps['onClose']
}> = memo(({ isOpen, onClose }) => {
    return (
        <LoginDialog maxWidth={'xl'} open={isOpen} onClose={onClose}>
            <Suspense fallback={'Loading...'}>
                <ContentModal />
            </Suspense>
        </LoginDialog>
    )
})
