import { styled } from '@mui/material'

export const ReportInfoContentContainer = styled('section')({
    display: 'grid',
    gridTemplateAreas: `
    'infoReportContent reportBadge'
    `,
    gridAutoColumns: '1fr 1fr',
})
