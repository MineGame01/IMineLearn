import { IAuthUser } from '@entities/User';

/**
 * Form of all necessary properties for storing information about the current authorized user
 *
 * Can be used to generate all properties in another object.
 * */
export const authUser: IAuthUser & { access_token: string | null } = {
  _id: 'unknown',
  username: 'unknown',
  bio: null,
  email: 'unknown',
  is_admin: false,
  created_at: 0,
  access_token: null,
};
