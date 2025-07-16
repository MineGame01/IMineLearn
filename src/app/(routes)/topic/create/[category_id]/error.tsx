'use client';
import { PageError } from '@shared/model';
import { ContainerErrorLayout, ErrorLayout } from '@shared/ui';
import { FC } from 'react';

const ErrorPage: FC<{ error: Error; reset: () => void }> = ({ error, reset }) => {
  const isPageError = error instanceof PageError;

  return (
    <ContainerErrorLayout>
      <ErrorLayout
        message={error.message}
        type_error={isPageError ? error.code : error.name}
        reset={reset}
      />
    </ContainerErrorLayout>
  );
};

export default ErrorPage;
