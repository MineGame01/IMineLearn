import { Dialog, styled } from '@mui/material'

export const LoginDialog = styled(Dialog)({
    '.MuiDialog-paper': {
        overflow: 'hidden',
    },
})

LoginDialog.defaultProps = {
    'aria-labelledby': 'login-modal-title',
    'aria-describedby': 'login-modal-form',
    open: false,
}
