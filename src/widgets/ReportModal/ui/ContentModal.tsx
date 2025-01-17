import { FC, useEffect } from 'react'
import { HeadingHidden } from '@shared/ui'
import { ReportInfoContentContainer } from '@widgets/ReportModal/ui/ReportInfoContentContainer.tsx'
import { ReportInfoContent } from '@widgets/ReportModal/ui/ReportInfoContent.tsx'
import { ReportForm } from '@widgets/ReportModal/ui/ReportForm.tsx'
import { ModalContainer } from '@widgets/ReportModal/ui/ModalContainer.tsx'
import { TTargetType } from '@widgets/ReportModal/model/TTargetType.ts'
import { TPostId } from '@entities/Post'
import { styled, Typography } from '@mui/material'
import { useLazyGetCommentByIdQuery, useLazyGetPostByIdQuery } from '@/app/api'

const ReportBadge = styled('div')({
    gridArea: 'reportBadge',
    fontSize: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
})

const ContentModal: FC<{
    targetType: TTargetType
    targetId: TPostId
    closeModal: () => void
}> = ({ targetType, targetId, closeModal }) => {
    const [getPostById, { data: dataPost, isFetching: isFetchingPost }] = useLazyGetPostByIdQuery()
    const [getCommentById, { data: dataComment, isFetching: isFetchingComment }] =
        useLazyGetCommentByIdQuery()

    useEffect(() => {
        const request = async () => {
            try {
                switch (targetType) {
                    case 'comment': {
                        await getCommentById({ comment_id: targetId }).unwrap()
                        return
                    }
                    case 'post': {
                        await getPostById(targetId).unwrap()
                        return
                    }
                }
            } catch (err) {
                console.error('Error get' + targetType, err)
            }
        }

        void request()
    }, [getCommentById, getPostById, targetId, targetType])

    if (!isFetchingPost && !isFetchingComment && !dataPost && !dataComment) {
        return (
            <ModalContainer>
                <HeadingHidden>Report Error</HeadingHidden>
                <Typography>Not found id target</Typography>
            </ModalContainer>
        )
    }

    return (
        <ModalContainer>
            <HeadingHidden>Report {targetType}</HeadingHidden>
            <ReportInfoContentContainer>
                <HeadingHidden>info on content</HeadingHidden>
                {isFetchingPost || isFetchingComment ? (
                    <div>Loading...</div>
                ) : (
                    <ReportInfoContent
                        targetType={targetType}
                        title={dataPost?.title || dataComment?.content || 'unknown'}
                    />
                )}
                <ReportBadge>🚫</ReportBadge>
            </ReportInfoContentContainer>
            <hr />
            <ReportForm closeModal={closeModal} targetType={targetType} targetId={targetId} />
        </ModalContainer>
    )
}

export default ContentModal
