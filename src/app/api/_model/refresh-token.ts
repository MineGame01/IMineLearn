import { IRefreshToken } from './refresh-token.type';

export class RefreshToken implements IRefreshToken {
  user_id: IRefreshToken['user_id'];
  iat?: IRefreshToken['iat'];
  exp?: IRefreshToken['exp'];

  constructor(args: IRefreshToken) {
    const { user_id, iat, exp } = args;

    this.user_id = user_id;
    this.iat = iat;
    this.exp = exp;
  }
}
