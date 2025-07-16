import { TGetTimeType, TTimeType } from '@shared/model';
import { TGetProfileEndpointInfo } from '../api/profile-api-endpoints.type';

type TGetProfileEndpointResponse = TGetProfileEndpointInfo['response'];

export interface TProfile<GTime extends TTimeType = 'timestamp'>
  extends Omit<TGetProfileEndpointResponse, 'created_at' | 'updated_at'> {
  created_at: TGetTimeType<GTime>;
  updated_at: TGetTimeType<GTime> | null;
}

export type TProfileDate = TProfile<'date'>;

export type TProfileIsAdmin = TProfile['is_admin'];
export type TProfileBio = TProfile['bio'];
