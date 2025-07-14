import 'next/server';
import { IUser } from '@entities/User';

declare global {
  interface Request {
    auth: IUser | null;
  }
}
