import { InputBase, InputBaseProps } from '@mui/material'
import React from 'react'
import { StyleApp } from '../styles/StyleApp'

export const Input: React.FC<InputBaseProps> = (props) => {
    const borderSize = StyleApp.border.setting.borderSize
    const borderColor = StyleApp.border.colors.colorBorder
    const background = StyleApp.background.colors.colorBackground
    const borderRadius = StyleApp.border.setting.borderRadius
    const timeoutAnimation = StyleApp.animation.timeoutAnimation

    return (
        <InputBase
            sx={{
                width: '100%',
                '&.Mui-focused': {
                    '& .MuiInputBase-input': {
                        borderColor: StyleApp.text.colors.colorAccent,
                    },
                },
                '& .MuiInputBase-input': {
                    transition: `border-color ${timeoutAnimation} ease`,
                    backgroundColor: background,
                    padding: '5px',
                    borderRadius: borderRadius,
                    border: `${borderSize} ${borderColor} solid`,
                },
            }}
            {...props}
        />
    )
}
