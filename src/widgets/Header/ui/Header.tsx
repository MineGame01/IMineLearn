import { useState, FC, useCallback, Fragment } from 'react';
import {
  authLogin,
  LoginModal,
  selectAuthIsLoading,
  selectAuthUserInfo,
} from '@widgets/LoginModal';
import { AppLogo, Button } from '@shared/ui';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@app/lib';
import Image from 'next/image';

export const Header: FC = () => {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const { access_token, username } = useAppSelector(selectAuthUserInfo);
  const isAuthLoading = useAppSelector(selectAuthIsLoading);
  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    setIsOpenLoginModal(false);
  }, []);

  const handleClickLogout = () => {
    dispatch(authLogin(null, null, null, 'logout'));
  };

  return (
    <div className="h-[50px]">
      <div className="px-[20px] h-full flex items-center justify-between">
        <Link href={'/'}>
          <AppLogo theme="dark" />
        </Link>
        {isAuthLoading ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            {!access_token && (
              <Fragment>
                <Button
                  className="w-auto"
                  variant={'contained'}
                  disabled={false}
                  onClick={() => setIsOpenLoginModal(true)}
                >
                  {false ? 'Logined' : 'Login'}
                </Button>
              </Fragment>
            )}
            {access_token && (
              <div className="flex items-center">
                <div className="rounded-full overflow-hidden">
                  <Image src="/defaultUser.png" alt={username} width="42" height="42" />
                </div>
                <Link className="ml-2" href={`/user/${username}`}>
                  {username}
                </Link>
                <Button onClick={handleClickLogout} variant="contained" className="ml-2 w-auto">
                  Logout
                </Button>
              </div>
            )}
          </Fragment>
        )}
        <LoginModal isOpen={isOpenLoginModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
};
