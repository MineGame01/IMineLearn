import { MouseEvent } from 'react'

export type THandleClickReaction<
    E extends HTMLElementTagNameMap[keyof HTMLElementTagNameMap] = HTMLElement,
> = (event: MouseEvent<E>, reaction: string) => void
