import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const TitleSecondary: FC<HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return (
    <span {...props} className={twMerge('uppercase text-[0.9rem] text-muted', className)}></span>
  );
};
