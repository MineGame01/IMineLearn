import { FC } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';

export const GreetingUser: FC<{ typeAuth: TTypeAuth }> = ({ typeAuth }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className='font-bold text-4xl'>{typeAuth === 'login' ? 'Welcome back!' : 'Welcome!'}</div>
        <div className='text-2xl'>{typeAuth === 'login' ? 'Login to your account' : "Let's create an account!"}</div>
      </div>
      <div className='text-4xl'>👋</div>
    </div>
  );
};
