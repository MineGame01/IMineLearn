import { TState } from '@/entities/Store'

export const selectauthUserId = (state: TState) => {
    return state.root.auth.id
}
