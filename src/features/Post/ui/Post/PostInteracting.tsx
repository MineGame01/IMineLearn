import { useState, FC, Dispatch } from 'react'
import { MdReport } from 'react-icons/md'
import { InteractingContainer } from '../Blocks/InteractingContainer.tsx'
import { Tooltip, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { TPostId } from '@entities/Post'
import { useGetCommentsByPostIdQuery, useGetPostByIdQuery } from '@/app/api'
import { FaComment, FaCommentSlash } from 'react-icons/fa6'
import { InteractingMenu } from '@features/Post/ui/Blocks/InteractingMenu.tsx'
import { InteractingListButton } from '@features/Post/ui/Blocks/InteractingListButton.tsx'
import { PostReactions } from '@features/Post/ui/Post/PostReactions.tsx'
import { ContainerButtonIcon } from '@features/Post/ui/Blocks/ContainerButtonIcon.tsx'
import { ButtonIcon } from '@features/Post/ui/Blocks/ButtonIcon.tsx'
import { ValueButtonIcon } from '@features/Post/ui/Blocks/ValueButtonIcon.tsx'
import { Tag } from '@shared/ui'
import { ReportModal } from '@widgets/ReportModal'

export const PostInteracting: FC<{
    postId: TPostId
    isShowComments: boolean
    setIsShowComments: Dispatch<boolean>
}> = ({ postId, isShowComments, setIsShowComments }) => {
    const { data: commentsData } = useGetCommentsByPostIdQuery({
        post_id: postId,
    })
    const { data: postData } = useGetPostByIdQuery(postId)

    const [isOpenReport, setIsOpenReport] = useState(false)

    const commentsLength = commentsData?.length

    if (postData) {
        return (
            <InteractingContainer>
                {postData.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                ))}
                <InteractingListButton>
                    <li>
                        <PostReactions postId={postId} />
                    </li>
                    <li>
                        <ContainerButtonIcon sx={{ padding: '5px' }}>
                            <Tooltip placement="top" title={'Comments'}>
                                <ButtonIcon
                                    disabled={commentsLength === 0}
                                    aria-label={isShowComments ? 'Close comments' : 'Open comments'}
                                    onClick={() => setIsShowComments(!isShowComments)}
                                >
                                    {!isShowComments ? <FaComment /> : <FaCommentSlash />}
                                </ButtonIcon>
                            </Tooltip>
                            <ValueButtonIcon>{commentsLength}</ValueButtonIcon>
                        </ContainerButtonIcon>
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
                            closeModal={() => setIsOpenReport(false)}
                            onCloseModal={() => setIsOpenReport(false)}
                            targetType={'post'}
                            targetId={postId}
                        />
                    </li>
                </InteractingListButton>
            </InteractingContainer>
        )
    } else {
        return <div>Error Fetching</div>
    }
}
