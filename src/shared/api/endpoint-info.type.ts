import { TEndpointFn } from './endpoint-fn.type';

export interface IEndpointInfo<
  TPayload = unknown,
  TResponse = unknown,
  GType extends 'query' | 'mutation' = 'query',
> {
  payload: TPayload;
  response: TResponse;
  type: GType;
  endpoint: TEndpointFn<TPayload, TResponse>;
}
