import { IAuthUser } from '@entities/LoginModal'

export interface IAuthSliceInitialState extends IAuthUser {
    isLoading: boolean
    error: string | null
}

export type TAuthError = IAuthSliceInitialState['error']
