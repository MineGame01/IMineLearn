export interface IAuthSliceInitialState {
    id: string | null
    username: string | null
    bio: string | null
    email: string | null
    isAdmin: boolean
    createAt: string | null
    isLoading: boolean
}

export type TAuthUserBio = IAuthSliceInitialState['bio']
export type TAuthUsername = IAuthSliceInitialState['username']
export type TAuthUserId = IAuthSliceInitialState['id']
export type TAuthUSerEmail = IAuthSliceInitialState['email']
