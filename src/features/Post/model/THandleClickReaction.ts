import { MouseEvent } from 'react'

export type THandleClickReaction<
    E extends HTMLElementTagNameMap[keyof HTMLElementTagNameMap] = HTMLButtonElement,
> = (event: MouseEvent<E>, reaction: string, reactionName: string) => void
