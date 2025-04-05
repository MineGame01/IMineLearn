import { FC } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { Button } from '@shared/ui';

export const ButtonSubmitAuth: FC<{
  authIsLoading: boolean;
  typeAuth: TTypeAuth;
  disabled: boolean;
}> = ({ authIsLoading, typeAuth, disabled }) => {
  const typeAuthFormat = typeAuth[0].toUpperCase() + typeAuth.slice(1);

  return (
    <Button
      className="font-[600] mt-[20px]"
      variant="contained"
      type="submit"
      disabled={authIsLoading || disabled}
    >
      {typeAuthFormat}
    </Button>
  );
};
