'use client';
import { PageError } from '@shared/model';
import { ContainerErrorLayout, ErrorLayout } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IProps {
  error: Error | PageError;
  reset: () => void;
}

const ErrorComponent: FC<IProps> = ({ error, reset }) => {
  const router = useRouter();

  return (
    <ContainerErrorLayout>
      <ErrorLayout
        router={router}
        reset={reset}
        message={error.message}
        type_error={error instanceof PageError ? error.code : error.name}
      />
    </ContainerErrorLayout>
  );
};

export default ErrorComponent;
