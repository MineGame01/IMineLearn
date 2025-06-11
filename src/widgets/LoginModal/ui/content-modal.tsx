'use client';
import { FC, useEffect, useState } from 'react';
import { GreetingUser } from '@widgets/LoginModal/ui/greeting-user';
import { AuthForm } from '@widgets/LoginModal/ui/auth-form';
import { ButtonChangeTypeAuth } from '@widgets/LoginModal/ui/button-change-type-auth';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';
import { AppLogo } from '@shared/ui';
import { useAppSelector } from '@app/lib';
import { selectAuthAccessToken } from '../model/authSlice';

interface IProps {
  onClose: () => void;
}

export const ContentModal: FC<IProps> = ({ onClose }) => {
  const [typeAuth, setTypeAuth] = useState<TTypeAuth>('login');
  const authAccessToken = useAppSelector(selectAuthAccessToken);

  useEffect(() => {
    if (authAccessToken) {
      onClose();
    }
  }, [authAccessToken, onClose]);

  return (
    <div className="p-5">
      <AppLogo theme="dark" className="w-full h-auto" />
      <AnimatePresence mode="wait">
        <m.div
          key={typeAuth}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-5"
        >
          <GreetingUser typeAuth={typeAuth} />
          <AuthForm typeAuth={typeAuth} />
          <ButtonChangeTypeAuth
            typeAuth={typeAuth}
            onClickChangeTypeAuth={() => {
              setTypeAuth(typeAuth === 'registration' ? 'login' : 'registration');
            }}
          />
        </m.div>
      </AnimatePresence>
    </div>
  );
};
