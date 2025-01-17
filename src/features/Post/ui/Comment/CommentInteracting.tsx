import { TPostId } from '@entities/Post'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { FC, useState } from 'react'
import { MdReport } from 'react-icons/md'
import { InteractingContainer } from '@features/Post/ui/Blocks/InteractingContainer.tsx'
import { InteractingListButton } from '@features/Post/ui/Blocks/InteractingListButton.tsx'
import { InteractingMenu } from '@features/Post/ui/Blocks/InteractingMenu.tsx'
import { CommentReactions } from '@features/Post/ui/Comment/CommentReactions.tsx'
import { ReportModal } from '@widgets/ReportModal'

export const CommentInteracting: FC<{ id: TPostId }> = ({ id }) => {
    const [isOpenReport, setIsOpenReport] = useState(false)

    return (
        <InteractingContainer>
            <InteractingListButton>
                <li>
                    <CommentReactions commentId={id} />
                </li>
                <li style={{ marginLeft: 'auto' }}>
                    <InteractingMenu>
                        <MenuItem onClick={() => setIsOpenReport(!isOpenReport)}>
                            <ListItemIcon>
                                <MdReport />
                            </ListItemIcon>
                            <ListItemText>Report</ListItemText>
                        </MenuItem>
                    </InteractingMenu>
                    <ReportModal
                        isOpen={isOpenReport}
                        onCloseModal={() => setIsOpenReport(false)}
                        closeModal={() => setIsOpenReport(false)}
                        targetType={'comment'}
                        targetId={id}
                    />
                </li>
            </InteractingListButton>
        </InteractingContainer>
    )
}
