import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  children: ReactNode;
  className?: string;
}

export const Paper: FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `bg-surface border-[1.5px] border-border rounded-default-radius`,
        className
      )}
    >
      {children}
    </div>
  );
};
