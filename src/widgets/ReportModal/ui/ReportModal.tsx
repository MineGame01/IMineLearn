import { FC, lazy, Suspense } from 'react'
import { Dialog } from '@mui/material'
import { TPostId } from '@entities/Post'
import { TTargetType } from '@widgets/ReportModal/model/TTargetType.ts'
import { ModalProps } from '@mui/material/Modal'

const ContentModal = lazy(() => import('./ContentModal.tsx'))

export const ReportModal: FC<{
    targetType: TTargetType
    targetId: TPostId
    closeModal: () => void
    isOpen: boolean
    onCloseModal: ModalProps['onClose']
}> = ({ targetType, targetId, closeModal, isOpen, onCloseModal }) => {
    return (
        <Dialog open={isOpen} onClose={onCloseModal}>
            <Suspense fallback={'Loading...'}>
                <ContentModal targetType={targetType} targetId={targetId} closeModal={closeModal} />
            </Suspense>
        </Dialog>
    )
}
