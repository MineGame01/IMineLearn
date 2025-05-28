import { ResponseError } from './response-error';

export class ResponseNoRightAdministrationError extends ResponseError {
  constructor() {
    super('You have no right of administration!', 403, 'NO-RIGHT-ADMINISTRATION');
  }
}
