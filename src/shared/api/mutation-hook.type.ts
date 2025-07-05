import { TEndpointFn } from '@shared/api';
import { QueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

export type TMutationHook<GEndpointFn extends TEndpointFn = TEndpointFn, TThis = unknown> = (
  this: TThis,
  options?: UseMutationOptions<Awaited<ReturnType<GEndpointFn>>, Error, Parameters<GEndpointFn>[0]>,
  queryClient?: QueryClient
) => UseMutationResult<Awaited<ReturnType<GEndpointFn>>, Error, Parameters<GEndpointFn>[0]>;
