import { FC, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

export const DropdownItem: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <li className={twMerge('', className)} {...props}>
      {children}
    </li>
  );
};
