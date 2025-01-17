import { styled, Typography } from '@mui/material'
import { FC } from 'react'

const Container = styled('div')({
    gridArea: 'infoReportContent',
})

export const ReportInfoContent: FC<{ targetType: string; title: string }> = ({
    targetType,
    title,
}) => {
    return (
        <Container>
            <Typography variant={'h4'} fontWeight={'700'}>
                Report {targetType}
            </Typography>
            <Typography variant={'body1'}>
                {targetType}: {title}
            </Typography>
        </Container>
    )
}
