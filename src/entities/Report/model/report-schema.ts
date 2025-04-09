import Joi from 'joi';
import { IReport, MAX_REPORT_CONTENT_LENGTH } from './report';
import { UserIdSchema } from '@entities/User';

export const ReportSchema = Joi.object<IReport>({
  user_id: UserIdSchema.required(),
  content: Joi.string().max(MAX_REPORT_CONTENT_LENGTH).required(),
  reason: Joi.string().required(),
  target_id: Joi.string().uuid().required(),
  target_type: Joi.string().valid('topic', 'comment').required(),
  created_at: Joi.number().default(new Date().getTime()),
});
