import React from 'react'

import { MdReport } from 'react-icons/md'
import { InteractingContainer } from '../Blocks/InteractingContainer.tsx'
import { Button, Tooltip, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { TPostId } from '@entities/Post'
import { useGetCommentsByPostIdQuery } from '@/app/api'
import { FaComment, FaCommentSlash } from 'react-icons/fa6'
import { InteractingMenu } from '@features/Post/ui/Blocks/InteractingMenu.tsx'
import { InteractingListButton } from '@features/Post/ui/Blocks/InteractingListButton.tsx'
import { PostReactions } from '@features/Post/ui/Post/PostReactions.tsx'

interface IPostInteractingProps {
    postId: TPostId
    isShowComments: boolean
    setIsShowComments: React.Dispatch<boolean>
}

export const PostInteracting: React.FC<IPostInteractingProps> = ({
    postId,
    isShowComments,
    setIsShowComments,
}) => {
    const { data: commentsData } = useGetCommentsByPostIdQuery({
        post_id: postId,
    })

    const commentsLength = commentsData?.length

    return (
        <InteractingContainer>
            <InteractingListButton sx={{ '& li:last-of-type': { marginLeft: 'auto' } }}>
                <li>
                    <PostReactions postId={postId} />
                </li>
                <li>
                    <Tooltip placement="top" title={'Comments'}>
                        <Button
                            sx={{ color: 'initial' }}
                            disabled={commentsLength === 0}
                            aria-label={isShowComments ? 'Close comments' : 'Open comments'}
                            onClick={() => setIsShowComments(!isShowComments)}
                            startIcon={!isShowComments ? <FaComment /> : <FaCommentSlash />}
                        >
                            {commentsLength}
                        </Button>
                    </Tooltip>
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
