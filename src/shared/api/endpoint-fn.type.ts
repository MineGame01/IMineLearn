export type TEndpointFn<TPayload = unknown, TResponse = unknown> = (
  payload: TPayload
) => Promise<TResponse>;
