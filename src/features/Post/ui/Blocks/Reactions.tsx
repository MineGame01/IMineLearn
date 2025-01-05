import { Button, Tooltip } from '@mui/material'
import { Fragment, FC } from 'react'
import { THandleClickReaction } from '@features/Post/model/THandleClickReaction.ts'

export const Reactions: FC<{
    reactions: {
        reaction: string
        name: string
        count: number
        user_reacted: boolean
    }[]
    onReaction: THandleClickReaction
}> = ({ reactions, onReaction }) => {
    return (
        <Fragment>
            {reactions.map((reaction) => {
                return (
                    <Tooltip key={reaction.name} title={reaction.name} placement="top">
                        <Button
                            variant={reaction.user_reacted ? 'outlined' : 'text'}
                            sx={{ color: 'initial' }}
                            aria-label={reaction.name}
                            onClick={(event) => onReaction(event, reaction.reaction, reaction.name)}
                        >
                            {reaction.reaction} {reaction.count}
                        </Button>
                    </Tooltip>
                )
            })}
        </Fragment>
    )
}
