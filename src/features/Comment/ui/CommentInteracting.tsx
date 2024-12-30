import { TPostId } from '@/entities/Post'
import { Interacting, InteractingListButton, InteractingMenu, Reactions } from '@/features/Post'
import { Button } from '@mui/material'
import React from 'react'
import { MdReport } from 'react-icons/md'
import { useFetchCommentReactions } from '../api/useFetchCommentReactions'

export const CommentInteracting: React.FC<{ id: TPostId }> = ({ id }) => {
    const { data: reactions, error } = useFetchCommentReactions(id)

    return (
        <Interacting type="comment">
            <InteractingListButton>
                <li>{reactions && !error && <Reactions reactions={reactions} />}</li>
                <li>
                    <InteractingMenu>
                        <Button>
                            <MdReport />
                            Report
                        </Button>
                    </InteractingMenu>
                </li>
            </InteractingListButton>
        </Interacting>
    )
}
