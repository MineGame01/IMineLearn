import { FC, Fragment } from 'react'
import { styled, Typography } from '@mui/material'
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts'

const Container = styled('section')({
    position: 'relative',
    marginTop: '50px',
})

const Heading = styled(Typography)({
    margin: '10px 0',
    fontSize: '2.2rem',
    fontWeight: '800',
})

const Description = styled(Typography)({
    fontSize: '1.5rem',
})

const Emotion = styled(Typography)({
    position: 'absolute',
    top: 0,
    bottom: '50%',
    right: 0,
    transform: 'translate(-50%, 50%)',
    fontSize: '2rem',
})

export const GreetingUser: FC<{ typeAuth: TTypeAuth }> = ({ typeAuth }) => {
    return (
        <Container>
            {typeAuth === 'login' ? (
                <Fragment>
                    <Heading variant={'h1'}>Welcome back!</Heading>
                    <Description>Login to your account</Description>
                    <Emotion>👋</Emotion>
                </Fragment>
            ) : (
                <Fragment>
                    <Heading variant={'h1'}>Welcome!</Heading>
                    <Description>Let's create an account</Description>
                    <Emotion>👋</Emotion>
                </Fragment>
            )}
        </Container>
    )
}
