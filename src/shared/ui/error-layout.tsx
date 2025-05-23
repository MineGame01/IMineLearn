import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FC, Fragment, ReactNode } from 'react';
import { Button } from './button';

export const ContainerErrorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="container h-screen mx-auto text-center">
      <div className="mt-30">{children}</div>
    </div>
  );
};

export const ErrorLayout: FC<{
  message?: string | null;
  type_error?: string | null;
  reset?: () => void;
  router: AppRouterInstance;
}> = ({ message, reset, type_error, router }) => {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold">{message ?? 'Unknown message!'}</h1>
      <p>
        <span className="font-bold">Type error:</span> {type_error ?? 'Unknown type!'}
      </p>
      <p>
        <span className="font-bold">Message:</span> {message ?? 'Unknown message!'}
      </p>
      <div className="mt-2 *:w-auto inline-flex gap-2">
        <Button
          onClick={() => {
            router.back();
          }}
          variant="contained"
        >
          Go to back
        </Button>
        {reset && (
          <Button onClick={reset} variant="contained">
            Restart
          </Button>
        )}
      </div>
    </Fragment>
  );
};
