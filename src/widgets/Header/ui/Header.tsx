'use client';
import { useState, FC, useCallback, Fragment, useRef } from 'react';
import { LoginModal } from '@widgets/LoginModal';
import { AppLogo, Button, DropdownItemLink, DropdownList } from '@shared/ui';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import PersonIcon from '@mui/icons-material/Person';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { authApiHooks } from '@entities/auth/api/auth-api-hooks';
import { selectAuthUser, useAuthStore } from '@entities/auth';
import { useMutationState } from '@tanstack/react-query';

const MemoDropdown = dynamic(async () => import('@shared/ui').then((el) => el.Dropdown));

export const Header: FC = () => {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const showUserMenuButton = useRef<HTMLButtonElement | null>(null);

  const authUser = useAuthStore(selectAuthUser);

  const { isPending: isPendingLogout, mutate: logout } = authApiHooks.useLogoutMutation();

  const loginStatus = useMutationState({
    filters: { mutationKey: ['login'] },
    select(mutate) {
      return mutate.state;
    },
  }).at(-1)?.status;

  const registrationStatus = useMutationState({
    filters: { mutationKey: ['registration'] },
    select(mutate) {
      return mutate.state;
    },
  }).at(-1)?.status;

  const refreshTokenStatus = useMutationState({
    filters: { mutationKey: ['refreshToken'] },
    select(mutate) {
      return mutate.state;
    },
  }).at(-1)?.status;

  const authorizationPending =
    isPendingLogout ||
    loginStatus === 'pending' ||
    registrationStatus === 'pending' ||
    refreshTokenStatus === 'pending';

  const handleCloseModal = useCallback(() => {
    setIsOpenLoginModal(false);
  }, []);

  const handleClickLogout = () => {
    logout();
  };

  return (
    <header className="h-[50px] bg-surface">
      <div className="px-[20px] h-full flex items-center justify-between">
        <Link href={'/'}>
          <AppLogo theme="dark" />
        </Link>
        <div>
          {loginStatus === 'pending' && 'Login...'}
          {registrationStatus === 'pending' && 'Registration...'}
          {refreshTokenStatus === 'pending' && 'Check auth...'}
          {isPendingLogout && 'Logout...'}
        </div>
        {!authorizationPending && (
          <Fragment>
            {!authUser && (
              <Fragment>
                <Button
                  className="w-auto"
                  variant={'contained'}
                  onClick={() => {
                    setIsOpenLoginModal(true);
                  }}
                >
                  Login
                </Button>
              </Fragment>
            )}
            {authUser && (
              <div className="flex items-center">
                <div className="rounded-full overflow-hidden">
                  <Image src="/defaultUser.png" alt={authUser.username} width="42" height="42" />
                </div>
                <button
                  ref={showUserMenuButton}
                  onClick={() => {
                    setShowUserMenu(true);
                  }}
                  className="ml-2"
                >
                  {authUser.username}
                </button>
                <MemoDropdown
                  open={showUserMenu}
                  anchorEl={showUserMenuButton}
                  close={() => {
                    setShowUserMenu(false);
                  }}
                >
                  <DropdownList>
                    <DropdownItemLink href={`/user/${authUser.username}`} leftIcon={<PersonIcon />}>
                      Profile
                    </DropdownItemLink>
                    {authUser.is_admin && (
                      <DropdownItemLink href="/moderation" leftIcon={<ReportGmailerrorredIcon />}>
                        Reports
                      </DropdownItemLink>
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
    </header>
  );
};
