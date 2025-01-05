import { useState, MouseEventHandler, FC } from 'react'
import { Button, Container, Link, styled, Typography } from '@mui/material'
import { useAppSelector } from '@/app/model'
import { LoginModal, selectAuthAccessToken } from '@widgets/LoginModal'

const Body = styled('header')(({ theme }) => ({
    backgroundColor: theme.background.colors.colorSecondaryBackground,
    height: '50px',
}))

const Wrapper = styled(Container)({
    padding: '0 20px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const Header: FC = () => {
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)

    const authAccessToken = useAppSelector(selectAuthAccessToken)

    const handleClickOpenLoginModal: MouseEventHandler = () => {
        setIsOpenLoginModal(true)
    }

    return (
        <Body>
            <Wrapper>
                <Link underline="none" href={'#'} color={'inherit'}>
                    <Typography variant={'caption'} fontSize={'1.5rem'} fontWeight={900}>
                        IMineLearn
                    </Typography>
                </Link>
                <Button
                    variant={'contained'}
                    disabled={Boolean(authAccessToken)}
                    onClick={handleClickOpenLoginModal}
                >
                    {authAccessToken ? 'Logined' : 'Login'}
                </Button>
                <LoginModal isOpen={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)} />
            </Wrapper>
        </Body>
    )
}
