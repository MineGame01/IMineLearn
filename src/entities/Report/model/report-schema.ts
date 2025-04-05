import Joi from 'joi';
import { IReport, MAX_REPORT_CONTENT_LENGTH } from './report';

export const ReportSchema = Joi.object<Omit<IReport, '_id'>, true>({
  user_id: Joi.string().required(),
  content: Joi.string().max(MAX_REPORT_CONTENT_LENGTH).required(),
  reason: Joi.string().required(),
  target_id: Joi.string().required(),
  target_type: Joi.string().required(),
  created_at: Joi.number().default(new Date().getTime()),
});
