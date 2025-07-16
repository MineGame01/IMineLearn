import { TUserId } from '@entities/User';
import jwt from 'jsonwebtoken';

export interface IRefreshToken extends jwt.JwtPayload {
  user_id?: TUserId;
}
