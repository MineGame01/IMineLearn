import { IAuthUser } from '@entities/LoginModal'

/**
 * Form of all necessary properties for storing information about the current authorized user
 *
 * Can be used to generate all properties in another object.
 * */
export const authUser: IAuthUser = {
    id: null,
    username: null,
    bio: null,
    email: null,
    isAdmin: false,
    createAt: null,
    accessToken: null,
}
