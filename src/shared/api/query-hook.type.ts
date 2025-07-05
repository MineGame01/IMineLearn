import { TEndpointFn } from '@shared/api';
import {
  DefinedInitialDataOptions,
  QueryClient,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

type TUseQueryOptions<TData = unknown> =
  | DefinedInitialDataOptions<TData>
  | UndefinedInitialDataOptions<TData>
  | UseQueryOptions<TData>;

export type TQueryHook<GEndpointFn extends TEndpointFn = TEndpointFn> = (
  payload: Parameters<GEndpointFn>[0],
  options?: Omit<TUseQueryOptions<Awaited<ReturnType<GEndpointFn>>>, 'queryKey'>,
  queryClient?: QueryClient
) => UseQueryResult<Awaited<ReturnType<GEndpointFn>>>;
