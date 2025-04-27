import { FC } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { Button } from '@shared/ui';

export const ButtonSubmitAuth: FC<{
  loading: boolean;
  typeAuth: TTypeAuth;
}> = ({ loading, typeAuth }) => {
  const typeAuthFormat = typeAuth[0].toUpperCase() + typeAuth.slice(1);

  return (
    <Button className="font-[600] mt-[20px]" variant="contained" type="submit" loading={loading}>
      {typeAuthFormat}
    </Button>
  );
};
