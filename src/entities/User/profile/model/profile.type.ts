import { TGetProfileEndpointInfo } from '../api/profile-api-endpoints.type';

export type TProfile = TGetProfileEndpointInfo['response'];

export type TProfileIsAdmin = TProfile['is_admin'];
export type TProfileBio = TProfile['bio'];
