import { Options } from 'ky';

export type TEndpointFn<TPayload = unknown, TResponse = unknown> = (
  payload: TPayload,
  options?: Options
) => Promise<TResponse>;
