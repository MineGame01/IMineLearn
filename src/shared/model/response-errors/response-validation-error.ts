import Joi from 'joi';
import { ResponseError } from './response-error';

export class ResponseValidationError extends ResponseError {
  constructor(error: Joi.ValidationError) {
    super(error.message, 400, 'VALIDATION-ERROR');
  }
}
