import { QueryClient, useMutation } from '@tanstack/react-query';
import { TMutationHook } from './mutation-hook.type';

type TCreateDefaultOptions<GMutationHook extends TMutationHook = TMutationHook> = (
  queryClient?: QueryClient
) => NonNullable<Parameters<GMutationHook>[0]>;

export const createMutationHook =
  <GMutationHook extends TMutationHook = TMutationHook>(
    createDefaultOptions:
      | TCreateDefaultOptions<GMutationHook>
      | NonNullable<Parameters<GMutationHook>[0]>
  ): TMutationHook =>
  (options, queryClient) => {
    const { mutationFn, mutationKey, ...defaultOptions } =
      typeof createDefaultOptions === 'function'
        ? createDefaultOptions(queryClient)
        : createDefaultOptions;

    return useMutation(
      {
        mutationFn,
        mutationKey,
        ...defaultOptions,
        ...options,
        async onSuccess(...args) {
          if (options?.onSuccess) await options.onSuccess(...args);
          if (defaultOptions.onSuccess) await defaultOptions.onSuccess(...args);
        },
      },
      queryClient
    );
  };
