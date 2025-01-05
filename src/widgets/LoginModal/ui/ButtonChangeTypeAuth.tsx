import { FC, MouseEventHandler } from 'react'
import { Button, styled, Typography } from '@mui/material'
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts'
import { useAppSelector } from '@/app/model'
import { selectAuthIsLoading } from '@widgets/LoginModal'

const ButtonStyle = styled(Button)({ textTransform: 'none', marginTop: '10px' })

export const ButtonChangeTypeAuth: FC<{
    typeAuth: TTypeAuth
    onClickChangeTypeAuth: MouseEventHandler<HTMLButtonElement>
}> = ({ onClickChangeTypeAuth, typeAuth }) => {
    const authIsLoading = useAppSelector(selectAuthIsLoading)

    return (
        <ButtonStyle onClick={onClickChangeTypeAuth} disabled={authIsLoading}>
            <Typography variant={'body1'}>
                {typeAuth === 'registration' ? 'Do you have an account?' : "Don't have an account?"}
            </Typography>
        </ButtonStyle>
    )
}
