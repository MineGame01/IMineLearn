import { FC, MouseEventHandler } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { useAppSelector } from '@app/lib';
import { selectAuthIsLoading } from '@widgets/LoginModal';
import { Button } from '@shared/ui';

export const ButtonChangeTypeAuth: FC<{
  typeAuth: TTypeAuth;
  onClickChangeTypeAuth: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClickChangeTypeAuth, typeAuth }) => {
  const authIsLoading = useAppSelector(selectAuthIsLoading);

  const content = {
    login: "Don't have an account?",
    registration: 'Do you have an account?',
  };

  return (
    <Button className="mt-[10px]" onClick={onClickChangeTypeAuth} disabled={authIsLoading}>
      {content[typeAuth]}
    </Button>
  );
};
