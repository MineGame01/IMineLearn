import React from 'react'

import { FaComment } from 'react-icons/fa6'
import { FaCommentSlash } from 'react-icons/fa6'
import { MdReport } from 'react-icons/md'
import { ForumAPI, useAppFetch } from '@/shared/api'
import { InteractingListButton } from './InteractingListButton'
import { Interacting } from './Interacting'
import { Reactions } from './Reactions'
import { InteractingMenu } from './InteractingMenu'
import { IconButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { TPostId } from '@/entities/Post'

interface IPostInteractingProps {
    id: TPostId
    isShowComment: boolean
    setShowComment?: React.Dispatch<boolean> | undefined
    commentLength?: number | string
}

export const PostInteracting: React.FC<IPostInteractingProps> = ({
    id,
    isShowComment,
    setShowComment,
    commentLength,
}) => {
    const {
        data: reactions,
        error,
        // isLoading: isReactionLoading,
    } = useAppFetch(ForumAPI.getReactions, {
        target_type: 'post',
        target_id: id,
    })

    return (
        <Interacting type="post">
            <InteractingListButton>
                <li>{reactions && !error && <Reactions reactions={reactions} />}</li>
                {setShowComment && (
                    <li>
                        <IconButton
                            disabled={commentLength === 0}
                            onClick={() => setShowComment(!isShowComment)}
                        >
                            {!isShowComment && <FaComment />}
                            {isShowComment && <FaCommentSlash />}
                        </IconButton>
                        <span>{commentLength}</span>
                    </li>
                )}
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
        </Interacting>
    )
}
