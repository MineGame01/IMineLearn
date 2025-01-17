import { Menu, MenuProps, styled, Tooltip } from '@mui/material'
import { useId, useState, FC, ReactNode, MouseEventHandler, Fragment } from 'react'
import { PiDotsThreeBold } from 'react-icons/pi'
import { ButtonIcon } from '@features/Post/ui/Blocks/ButtonIcon.tsx'

const MenuStyled = styled(Menu)(({ theme }) => ({
    '.MuiMenu-paper': {
        boxShadow: theme.shadows[3],
        borderRadius: theme.border.setting.borderRadius,
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
                <ButtonIcon
                    aria-expanded={isOpen ?? undefined}
                    aria-controls={isOpen ? menuId : undefined}
                    onClick={handleClickOpen}
                >
                    <PiDotsThreeBold />
                </ButtonIcon>
            </Tooltip>

            <MenuStyled id={menuId} anchorEl={anchorEl} open={isOpen} onClose={handleClickClose}>
                {children}
            </MenuStyled>
        </Fragment>
    )
}
