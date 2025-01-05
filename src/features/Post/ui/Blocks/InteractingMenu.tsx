import { IconButton, Menu, MenuProps, styled, Tooltip } from '@mui/material'
import { useId, useState, FC, ReactNode, MouseEventHandler, Fragment } from 'react'
import { PiDotsThreeBold } from 'react-icons/pi'

const MenuStyled = styled(Menu)(({ theme }) => ({
    '.MuiMenu-paper': {
        boxShadow: 'none',
        borderStyle: 'solid',
        borderWidth: theme.border.setting.borderSize,
        borderRadius: theme.border.setting.borderRadius,
        borderColor: theme.border.colors.colorBorder,
        background: theme.background.colors.colorSecondaryBackground,
    },
}))

export const InteractingMenu: FC<{ children: ReactNode }> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isOpen = Boolean(anchorEl)

    const menuId = useId()

    const handleClickOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClickClose: MenuProps['onClose'] = () => {
        setAnchorEl(null)
    }

    return (
        <Fragment>
            <Tooltip title={'Others'} placement="top">
                <IconButton
                    aria-expanded={isOpen ?? undefined}
                    aria-controls={isOpen ? menuId : undefined}
                    onClick={handleClickOpen}
                >
                    <PiDotsThreeBold />
                </IconButton>
            </Tooltip>

            <MenuStyled id={menuId} anchorEl={anchorEl} open={isOpen} onClose={handleClickClose}>
                {children}
            </MenuStyled>
        </Fragment>
    )
}
