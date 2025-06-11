import { TEndpointFn } from './endpoint-fn.type';

export interface IEndpointInfo<TPayload = unknown, TResponse = unknown> {
  payload: TPayload;
  response: TResponse;
  endpoint: TEndpointFn<TPayload, TResponse>;
}
