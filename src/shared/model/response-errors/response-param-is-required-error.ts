import { ResponseError } from './response-error';

export class ResponseParamIsRequiredError extends ResponseError {
  constructor(isQueryParam: boolean, ...param: string[]) {
    super(
      `${isQueryParam ? 'Query ' : ''}Param ${param[0]}${param.length > 1 ? ' or ' : ''}${[...param.slice(1)].join(', ')} is required!`,
      400,
      'PARAM-IS-REQUIRED'
    );
  }
}
