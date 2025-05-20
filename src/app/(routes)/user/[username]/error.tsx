'use client';
import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ErrorLayout } from '@shared/ui';
import { PageError } from '@shared/model';
import { UserNotFoundError } from './_model/user-not-found-error';

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="container h-screen mx-auto text-center">
      <div className="mt-30">{children}</div>
    </div>
  );
};

const ErrorComponent: FC<{
  error: Error | PageError;
  reset: () => void;
}> = ({ error, reset }) => {
  const router = useRouter();

  if (error instanceof PageError) {
    const { message, code } = error;

    if (error instanceof UserNotFoundError) {
      return (
        <Container>
          <Image
            src="/user-not-found_512x512.png"
            alt="User not found"
            className="w-[100px] mx-auto lg:w-[200px] h-auto"
            width={200}
            height={200}
          />
          <ErrorLayout router={router} reset={reset} type_error={code} message={message} />
        </Container>
      );
    } else {
      return (
        <Container>
          <ErrorLayout router={router} reset={reset} type_error={code} message={message} />
        </Container>
      );
    }
  } else if (error instanceof Error) {
    return (
      <Container>
        <ErrorLayout router={router} reset={reset} is_unknown_error />
      </Container>
    );
  }
};

export default ErrorComponent;
