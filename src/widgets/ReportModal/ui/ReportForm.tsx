import {
    FormControl,
    FormHelperText,
    FormLabel,
    LinearProgress,
    styled,
    Typography,
} from '@mui/material'
import { Input } from '@shared/ui'
import { FC, useRef, useState, Fragment } from 'react'
import { ActionButton } from '@widgets/ReportModal/ui/ActionButton.tsx'
import { useSendReportContentMutation } from '@/app/api'
import { TTargetType } from '@widgets/ReportModal/model/TTargetType.ts'
import { RadiosReasonReport } from '@widgets/ReportModal/ui/RadiosReasonReport.tsx'

const Form = styled(FormControl)({
    width: '100%',
    marginTop: '30px',
})

const MAX_LENGTH = 255

export const ReportForm: FC<{
    closeModal: () => void
    targetType: TTargetType
    targetId: string
}> = ({ closeModal, targetType, targetId }) => {
    const [reasonReport, setReasonReport] = useState('')
    const [otherReasonReport, setOtherReasonReport] = useState('')
    const [error, setError] = useState<string | null>(null)
    const idErrorTimeout = useRef<NodeJS.Timeout | null>(null)

    const isError = Boolean(error)

    const [sendReportContent, { isLoading }] = useSendReportContentMutation()

    const handleClickSubmitReport = async () => {
        if (idErrorTimeout.current) {
            clearTimeout(idErrorTimeout.current)
        }
        try {
            await sendReportContent({
                target_id: targetId,
                target_type: targetType,
                reason: reasonReport !== 'Other' ? reasonReport : otherReasonReport,
            }).unwrap()
            closeModal()
        } catch (err) {
            console.error('Error send report!', err)
            setError('Error send report!')
            idErrorTimeout.current = setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    return (
        <Form>
            <FormLabel id={'report-modal-label-report-form'}>Why Are You Reporting This?</FormLabel>
            <RadiosReasonReport setReasonReport={setReasonReport} />
            {reasonReport === 'Other' && (
                <Fragment>
                    <Input
                        error={isError}
                        required={true}
                        autoFocus={true}
                        value={otherReasonReport}
                        onChange={(event) => {
                            const value = event.currentTarget.value
                            setOtherReasonReport((prevOtherReasonReport) =>
                                value.length <= MAX_LENGTH ? value : prevOtherReasonReport,
                            )
                        }}
                    />
                    <FormHelperText>Max length: {MAX_LENGTH}</FormHelperText>
                </Fragment>
            )}
            <ActionButton
                closeModal={closeModal}
                disabledSendButton={!reasonReport || isLoading}
                onClickSubmit={handleClickSubmitReport}
            />
            {error && (
                <Typography textAlign={'center'} color={'red'} marginTop={'10px'}>
                    {error}
                </Typography>
            )}
            {isLoading && <LinearProgress sx={{ marginTop: '10px' }} />}
        </Form>
    )
}
