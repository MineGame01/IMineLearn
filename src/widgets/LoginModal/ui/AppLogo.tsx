import { styled, Typography } from '@mui/material'
import { FC } from 'react'

const Container = styled('div')({
    textAlign: 'center',
})

const Heading = styled(Typography)({
    fontWeight: 800,
    fontSize: '3rem',
    margin: 0,
})

const Description = styled(Typography)({
    position: 'relative',
    fontWeight: 800,
    fontSize: '1.2rem',
    letterSpacing: '4px',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '34px',
        height: '9px',
        left: '-68px',
        top: '50%',
        transform: 'translate(50%, -50%)',
        backgroundColor: 'black',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '34px',
        height: '9px',
        right: '-30px',
        top: '50%',
        transform: 'translate(50%, -50%)',
        backgroundColor: 'black',
    },
})

export const AppLogo: FC = () => {
    return (
        <Container>
            <Heading variant={'h1'}>IMINELEARN</Heading>
            <Description variant={'caption'}>FORUM</Description>
        </Container>
    )
}
