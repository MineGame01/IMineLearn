import { FC, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const PhotoContainer: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        'flex justify-center w-full h-[80px] grow-1 overflow-hidden rounded-border-default relative',
        className
      )}
    >
      {children}
    </div>
  );
};
