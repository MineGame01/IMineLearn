import { FC } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';

export const GreetingUser: FC<{ typeAuth: TTypeAuth }> = ({ typeAuth }) => {
  const heading = {
    login: 'Welcome back!',
    registration: 'Welcome!',
  };

  const description = {
    login: 'Login to your account',
    registration: "Let's create an account!",
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-bold text-4xl">{heading[typeAuth]}</div>
        <div className="text-2xl">{description[typeAuth]}</div>
      </div>
      <div className="ml-5 text-4xl">👋</div>
    </div>
  );
};
