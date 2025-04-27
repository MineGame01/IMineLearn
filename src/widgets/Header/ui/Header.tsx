import { useState, FC, useCallback, Fragment, useRef } from 'react';
import {
  authLogin,
  LoginModal,
  selectAuthIsLoading,
  selectAuthUserInfo,
} from '@widgets/LoginModal';
import { AppLogo, Button, DropdownItem, DropdownList } from '@shared/ui';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@app/lib';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import PersonIcon from '@mui/icons-material/Person';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const MemoDropdown = dynamic(async () => import('@shared/ui').then((el) => el.Dropdown));

export const Header: FC = () => {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const showUserMenuButton = useRef<HTMLButtonElement | null>(null);
  const { access_token, username, is_admin } = useAppSelector(selectAuthUserInfo);
  const isAuthLoading = useAppSelector(selectAuthIsLoading);
  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    setIsOpenLoginModal(false);
  }, []);

  const handleClickLogout = () => {
    dispatch(authLogin(null, null, null, 'logout'));
  };

  return (
    <div className="h-[50px] bg-surface">
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
                <button
                  ref={showUserMenuButton}
                  onClick={() => setShowUserMenu(true)}
                  className="ml-2"
                >
                  {username}
                </button>
                <MemoDropdown
                  open={showUserMenu}
                  anchorEl={showUserMenuButton}
                  close={() => setShowUserMenu(false)}
                >
                  <DropdownList>
                    <DropdownItem>
                      <PersonIcon />
                      <Link href={`/user/${username}`}>Profile</Link>
                    </DropdownItem>
                    {is_admin && (
                      <DropdownItem>
                        <ReportGmailerrorredIcon />
                        <Link href="/moderation">Reports</Link>
                      </DropdownItem>
                    )}
                  </DropdownList>
                </MemoDropdown>
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
