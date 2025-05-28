import { ResponseError } from './response-error';

export class ResponseNotFoundError extends ResponseError {
  constructor(content: string) {
    super(`${content}${content ? ' not' : 'Not'} found`, 404, 'NOT-FOUND');
  }
}
