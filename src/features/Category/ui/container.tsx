import { FC, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Container: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={twMerge('flex flex-wrap h-full p-[30px]', className)}>
      {children}
    </div>
  );
};
