import { IAccessToken } from './access-token.type';

export class AccessToken implements IAccessToken {
  email: IAccessToken['email'];
  hash_password: IAccessToken['hash_password'];
  is_admin: IAccessToken['is_admin'];
  username: IAccessToken['username'];
  id: IAccessToken['id'];
  iat?: IAccessToken['iat'];
  exp?: IAccessToken['exp'];

  constructor(args: IAccessToken) {
    const { email, hash_password, is_admin, username, id, iat, exp } = args;
    this.email = email;
    this.hash_password = hash_password;
    this.is_admin = is_admin;
    this.username = username;
    this.id = id;
    this.iat = iat;
    this.exp = exp;
  }
}
