import { styled, Typography } from '@mui/material'

export const Title = styled(Typography)({
    fontSize: '1.4rem',
    fontWeight: '600',
})

Title.defaultProps = {
    variant: 'h1',
}
