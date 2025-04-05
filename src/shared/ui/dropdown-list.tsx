import { FC, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends HTMLAttributes<HTMLUListElement> {
    children: ReactNode
}

export const DropdownList: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <ul className={twMerge("*:hover:bg-blue-100 *:px-2 *:py-1 *:rounded-[5px] text-[0.9rem]", className)} {...props}>
      {children}
    </ul>
  );
};
