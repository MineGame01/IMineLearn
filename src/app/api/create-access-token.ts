import { IUser } from "@entities/User"
import jwt from 'jsonwebtoken'

export const createAccessToken = (user: IUser) => {
    return jwt.sign(user, process.env.PRIVATE_KEY_JWT as string, { expiresIn: '10m' })
}