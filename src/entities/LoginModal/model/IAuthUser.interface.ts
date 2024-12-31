export interface IAuthUser {
    id: string | null
    username: string | null
    bio: string | null
    email: string | null
    isAdmin: boolean
    createAt: string | null
    accessToken: string | null
}

export type TAuthUserBio = IAuthUser['bio']
export type TAuthUsername = IAuthUser['username']
export type TAuthUserId = IAuthUser['id']
export type TAuthUserEmail = IAuthUser['email']
export type TAuthAccessToken = IAuthUser['accessToken']
