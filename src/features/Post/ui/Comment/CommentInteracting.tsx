import { TPostId } from '@entities/Post'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { FC } from 'react'
import { MdReport } from 'react-icons/md'
import { InteractingContainer } from '@features/Post/ui/Blocks/InteractingContainer.tsx'
import { InteractingListButton } from '@features/Post/ui/Blocks/InteractingListButton.tsx'
import { InteractingMenu } from '@features/Post/ui/Blocks/InteractingMenu.tsx'
import { CommentReactions } from '@features/Post/ui/Comment/CommentReactions.tsx'

export const CommentInteracting: FC<{ id: TPostId }> = ({ id }) => {
    return (
        <InteractingContainer>
            <InteractingListButton sx={{ '& li:last-of-type': { marginLeft: 'auto' } }}>
                <li>
                    <CommentReactions commentId={id} />
                </li>
                <li>
                    <InteractingMenu>
                        <MenuItem>
                            <ListItemIcon>
                                <MdReport />
                            </ListItemIcon>
                            <ListItemText>Report</ListItemText>
                        </MenuItem>
                    </InteractingMenu>
                </li>
            </InteractingListButton>
        </InteractingContainer>
    )
}
