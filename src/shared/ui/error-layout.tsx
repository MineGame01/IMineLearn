import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FC, Fragment } from 'react';
import { Button } from './button';

export const ErrorLayout: FC<{
  message?: string | null;
  type_error?: string | null;
  is_unknown_error?: boolean;
  reset?: () => void;
  router: AppRouterInstance;
}> = ({ message, reset, type_error, router, is_unknown_error = false }) => {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold">
        {is_unknown_error ? 'Unknown error' : (message ?? 'Unknown message!')}
      </h1>
      <p>
        <span className="font-bold">Type error:</span> {type_error ?? 'Unknown type!'}
      </p>
      {is_unknown_error && (
        <p>
          <span className="font-bold">Message:</span> {message ?? 'Unknown message!'}
        </p>
      )}
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
