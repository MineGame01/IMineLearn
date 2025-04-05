import { TUserId } from '@entities/User';

export const MIN_REPORT_CONTENT_LENGTH = 30;
export const MAX_REPORT_CONTENT_LENGTH = 255;

export interface IReport {
  _id: string;
  user_id: TUserId;
  content: string;
  reason: string;
  target_id: string;
  target_type: 'topic' | 'comment';
  created_at: number;
}

export type TReportTargetType = IReport['target_type'];
export type TReportTargetId = IReport['target_id'];
