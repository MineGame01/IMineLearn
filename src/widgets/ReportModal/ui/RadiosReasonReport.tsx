import { Dispatch, useMemo, FC } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

export const RadiosReasonReport: FC<{ setReasonReport: Dispatch<string> }> = ({
    setReasonReport,
}) => {
    const reasonsReport = useMemo(() => {
        return [
            'Spam or Advertising',
            'Abuse or Hate Speech',
            'Inappropriate Content',
            'Misinformation',
            'Rules Violation',
        ]
    }, [])

    return (
        <RadioGroup aria-labelledby={'report-modal-label-report-form'} name={'report-content-form'}>
            {reasonsReport.map((report, index) => (
                <FormControlLabel
                    key={index}
                    control={<Radio />}
                    label={report}
                    value={report}
                    required={true}
                    onClick={() => setReasonReport(report)}
                />
            ))}
            <hr />
            <FormControlLabel
                control={<Radio />}
                label={'Other'}
                value={'Other'}
                required={true}
                onClick={() => {
                    setReasonReport('')
                    setReasonReport('Other')
                }}
            />
        </RadioGroup>
    )
}
