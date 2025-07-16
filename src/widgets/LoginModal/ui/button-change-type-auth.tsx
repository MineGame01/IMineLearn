import { FC, MouseEventHandler } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { Button } from '@shared/ui';

export const ButtonChangeTypeAuth: FC<{
  typeAuth: TTypeAuth;
  onClickChangeTypeAuth: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClickChangeTypeAuth, typeAuth }) => {
  const content = {
    login: "Don't have an account?",
    registration: 'Do you have an account?',
  };

  return (
    <Button className="mt-[10px]" onClick={onClickChangeTypeAuth}>
      {content[typeAuth]}
    </Button>
  );
};
