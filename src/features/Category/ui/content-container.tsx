import { FC, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ContentContainer: FC<IProps> = ({ children, className, ...props }) => {
  return <div {...props} className={twMerge("grow-1 basis-full flex gap-[80px] my-[20px]", className)}>
    {children}
  </div>
}