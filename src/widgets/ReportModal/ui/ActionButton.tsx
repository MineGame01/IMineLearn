import { FC, MouseEventHandler } from 'react'
import { Button, ButtonGroup, styled } from '@mui/material'

const Container = styled(ButtonGroup)({
    marginTop: '30px',
})

export const ActionButton: FC<{
    closeModal: () => void
    disabledSendButton: boolean
    onClickSubmit: MouseEventHandler
}> = ({ closeModal, disabledSendButton, onClickSubmit }) => {
    return (
        <Container fullWidth={true}>
            <Button
                variant={'text'}
                onClick={() => {
                    closeModal()
                }}
            >
                Cancel
            </Button>
            <Button disabled={disabledSendButton} onClick={onClickSubmit} variant={'contained'}>
                Send
            </Button>
        </Container>
    )
}
