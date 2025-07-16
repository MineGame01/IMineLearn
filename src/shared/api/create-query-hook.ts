import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { TQueryHook } from './query-hook.type';

type TCreateDefaultOptions<GQueryHook extends TQueryHook = TQueryHook> = (
  payload: Parameters<GQueryHook>[0],
  queryClient: QueryClient
) => NonNullable<Parameters<GQueryHook>[1]>;

export const createQueryHook =
  <GQueryHook extends TQueryHook = TQueryHook>(
    createDefaultOptions: TCreateDefaultOptions<GQueryHook>
  ): TQueryHook =>
  (payload, options, queryClient) => {
    const queryClientContext = useQueryClient();

    const defaultOptions = createDefaultOptions(payload, queryClient ?? queryClientContext);

    return useQuery(
      {
        ...defaultOptions,
        queryKey: defaultOptions.queryKey ?? [],
        ...options,
      },
      queryClient
    );
  };
