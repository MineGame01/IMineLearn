import { TEndpointFn } from './endpoint-fn.type';
import { TMutationHook } from './mutation-hook.type';
import { TQueryHook } from './query-hook.type';

export type Hookify<
  T extends Record<string, TEndpointFn>,
  type extends 'query' | 'mutation' = 'query',
> = {
  [K in keyof T as `use${Capitalize<string & K>}${type extends 'query' ? 'Query' : 'Mutation'}`]: type extends 'query'
    ? TQueryHook<T[K]>
    : TMutationHook<T[K]>;
};
