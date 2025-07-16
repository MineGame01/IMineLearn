import 'next/server';
import { IAccessToken } from '@app/api/_model/access-token.type';

declare global {
  interface Request {
    auth: IAccessToken | null;
  }
}
