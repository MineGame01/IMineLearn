'use client';
import { FC } from 'react';
import Image from 'next/image';
import { ContainerErrorLayout, ErrorLayout } from '@shared/ui';
import { PageError } from '@shared/model';
import { UserNotFoundError } from './_model/user-not-found-error';

const ErrorComponent: FC<{
  error: Error | PageError;
  reset: () => void;
}> = ({ error, reset }) => {
  const isPageError = error instanceof PageError;

  return (
    <ContainerErrorLayout>
      {error instanceof UserNotFoundError && (
        <Image
          src="/user-not-found_512x512.png"
          alt="User not found"
          className="w-[100px] mx-auto lg:w-[200px] h-auto"
          width={200}
          height={200}
        />
      )}
      <ErrorLayout
        reset={reset}
        type_error={isPageError ? error.code : error.name}
        message={error.message}
      />
    </ContainerErrorLayout>
  );
};

export default ErrorComponent;
