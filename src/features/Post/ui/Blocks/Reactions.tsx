import { Skeleton, styled, Tooltip } from '@mui/material'
import { FC, useCallback } from 'react'
import { THandleClickReaction } from '@features/Post/model/THandleClickReaction.ts'
import { BiLike } from 'react-icons/bi'
import { BiDislike } from 'react-icons/bi'
import { BiHeart } from 'react-icons/bi'
import { BiSolidLike } from 'react-icons/bi'
import { BiSolidDislike } from 'react-icons/bi'
import { BiSolidHeart } from 'react-icons/bi'
import { ContainerButtonIcon } from '@features/Post/ui/Blocks/ContainerButtonIcon.tsx'
import { ButtonIcon } from '@features/Post/ui/Blocks/ButtonIcon.tsx'
import { ValueButtonIcon } from '@features/Post/ui/Blocks/ValueButtonIcon.tsx'

const BodyReactions = styled('ul')({
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    '& li': {
        padding: '5px',
        marginRight: '50px',
    },
})

const SkeletonLoading = styled(Skeleton)({
    display: 'inline-block',
    width: 35,
    height: 35,
    marginLeft: '20px',
})

SkeletonLoading.defaultProps = {
    variant: 'circular',
}

export const Reactions: FC<{
    reactions: {
        reaction: string
        name: string
        count: number
        user_reacted: boolean
    }[]
    onReaction: THandleClickReaction
    isLoading: boolean
}> = ({ reactions, onReaction, isLoading }) => {
    const getReactionIcon = useCallback((reactionName: string, userReacted: boolean) => {
        const icons = {
            default: {
                Like: <BiLike />,
                Dislike: <BiDislike />,
                Love: <BiHeart />,
            },
            userReacted: {
                Like: <BiSolidLike />,
                Dislike: <BiSolidDislike />,
                Love: <BiSolidHeart />,
            },
        }
        if (userReacted) {
            return icons.userReacted[reactionName as keyof typeof icons.userReacted]
        } else {
            return icons.default[reactionName as keyof typeof icons.default]
        }
    }, [])

    return (
        <BodyReactions>
            {!isLoading ? (
                reactions.map((reaction) => {
                    return (
                        <li key={reaction.name}>
                            <ContainerButtonIcon>
                                <Tooltip title={reaction.name} placement="top">
                                    <ButtonIcon
                                        aria-label={reaction.name}
                                        onClick={(event) => onReaction(event, reaction.reaction)}
                                    >
                                        {getReactionIcon(reaction.name, reaction.user_reacted)}
                                    </ButtonIcon>
                                </Tooltip>
                                <ValueButtonIcon variant={'button'}>
                                    {reaction.count}
                                </ValueButtonIcon>
                            </ContainerButtonIcon>
                        </li>
                    )
                })
            ) : (
                <li>
                    <ContainerButtonIcon>
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                    </ContainerButtonIcon>
                </li>
            )}
        </BodyReactions>
    )
}
