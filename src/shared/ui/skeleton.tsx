import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: FC<IProps> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge('bg-surface animate-pulse w-[100px] h-[20px]', className)}
    ></div>
  );
};
