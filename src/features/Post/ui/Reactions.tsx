import { ForumAPI } from '@/shared/api'
import { Button, Tooltip } from '@mui/material'
import React from 'react'

export const Reactions: React.FC<{
    reactions: Awaited<ReturnType<typeof ForumAPI.getReactions>>
}> = ({ reactions }) => {
    return (
        <React.Fragment>
            {reactions.map((reaction) => {
                return (
                    <Tooltip key={reaction.name} title={reaction.name} placement="top">
                        <Button
                            sx={{
                                color: 'black',
                            }}
                            key={reaction.name}
                            aria-label={reaction.name}
                        >
                            {reaction.reaction} {reaction.count}
                        </Button>
                    </Tooltip>
                )
            })}
        </React.Fragment>
    )
}
