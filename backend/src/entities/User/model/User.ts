import {randomUUID} from "node:crypto";

interface IUser {
    id: string,
    username: string,
    bio: string | null,
    email: string,
    hash_password: string,
    is_admin: boolean,
    created_at: string,
    salt: string,
}

export type TUserId = IUser["id"]
export type TUserUserName = IUser["username"]
export type TUserBio = IUser["bio"]
export type TUserEmail = IUser["email"]
export type TUserHashPassword = IUser["hash_password"]
export type TUserIsAdmin = IUser["is_admin"]
export type TUserCreatedAt = IUser['created_at']
export type TUserSalt = IUser["salt"]

export class User implements IUser {
    id
    username
    bio: TUserBio
    email
    hash_password
    is_admin
    created_at
    salt
    constructor(email: TUserEmail, hashPassword: TUserHashPassword, salt: TUserSalt) {
        this.id = randomUUID()
        this.username = email
        this.bio = null
        this.email = email
        this.hash_password = hashPassword
        this.is_admin = false
        this.created_at = new Date().toJSON()
        this.salt = salt
    }
}