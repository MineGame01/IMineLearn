import { TUserId } from '@entities/User';
import { TGetTimeType, TTimeType } from '@shared/model';

export const MIN_REPORT_CONTENT_LENGTH = 30;
export const MAX_REPORT_CONTENT_LENGTH = 255;

export interface IReport<GTime extends TTimeType = 'timestamp'> {
  id: string;
  user_id: TUserId;
  content: string;
  reason: string;
  target_id: string;
  target_type: string;
  created_at: TGetTimeType<GTime>;
}

export type TReportDate = IReport<'date'>;

export type TReportTargetType = IReport['target_type'];
export type TReportTargetId = IReport['target_id'];
export type TReportId = IReport['id'];
export type TReportContent = IReport['content'];
export type TReportReason = IReport['reason'];
