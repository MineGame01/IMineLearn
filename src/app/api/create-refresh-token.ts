import { TUserId } from '@entities/User'
import jwt from 'jsonwebtoken'

export const createRefreshToken = (userId: TUserId) => {
    return jwt.sign({ user_id: userId }, process.env.PRIVATE_KEY_JWT as string, {
        expiresIn: '30d',
    })
}