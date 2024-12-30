import { StyleApp } from '@/shared/ui'
import { IconButton, Menu, Tooltip } from '@mui/material'
import React, { useId, useState } from 'react'
import { PiDotsThreeBold } from 'react-icons/pi'

export const InteractingMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isOpen = Boolean(anchorEl)

    const menuId = useId()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Tooltip title={'Others'} placement="top">
                <IconButton
                    aria-expanded={isOpen ?? undefined}
                    aria-controls={isOpen ? menuId : undefined}
                    onClick={handleClick}
                >
                    <PiDotsThreeBold />
                </IconButton>
            </Tooltip>

            <Menu
                sx={{
                    '.MuiMenu-paper': {
                        boxShadow: 'none',
                        borderStyle: 'solid',
                        borderWidth: StyleApp.border.setting.borderSize,
                        borderRadius: StyleApp.border.setting.borderRadius,
                        borderColor: StyleApp.border.colors.colorBorder,
                        background: StyleApp.background.colors.colorSecondaryBackground,
                    },
                }}
                id={menuId}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
            >
                {children}
            </Menu>
        </>
    )
}
