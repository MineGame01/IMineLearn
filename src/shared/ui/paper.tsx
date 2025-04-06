import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  children: ReactNode;
  className?: string;
}

export const Paper: FC<IProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`bg-surface border-2 border-border rounded-border-default`, className)}>
      {children}
    </div>
  );
};
