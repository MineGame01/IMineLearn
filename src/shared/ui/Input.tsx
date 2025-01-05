import { InputBase, styled } from '@mui/material'

export const Input = styled(InputBase)(({ theme }) => ({
    width: '100%',
    '&.Mui-focused': {
        '& .MuiInputBase-input': {
            borderColor: theme.text.colors.colorAccent,
        },
    },
    '&.Mui-error': {
        '& .MuiInputBase-input': {
            borderColor: theme.palette.error.light,
        },
    },
    '& .MuiInputBase-input': {
        transition: `border-color ${theme.animation.timeoutAnimation} ease`,
        backgroundColor: theme.background.colors.colorBackground,
        padding: '5px',
        borderRadius: theme.border.setting.borderRadius,
        border: `${theme.border.setting.borderSize} ${theme.border.colors.colorBorder} solid`,
    },
}))
