import { useMutation } from '@tanstack/react-query';
import { TMutationHook } from './mutation-hook.type';

export const createMutationHook =
  <GMutationHook extends TMutationHook = TMutationHook>({
    mutationFn,
    mutationKey,
    ...defaultOptions
  }: NonNullable<Parameters<GMutationHook>[0]>): TMutationHook =>
  (options, queryClient) => {
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
