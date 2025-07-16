'use client';
import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { getDropdownItemDefaultStyles } from './get-dropdown-item-default-style';

export interface IDropdownItemDefaultProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  active?: boolean;
  href?: string;
  disabled?: boolean;
}

export const DropdownItem: FC<
  Pick<IDropdownItemDefaultProps, 'leftIcon' | 'rightIcon' | 'active' | 'disabled'> &
    ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, leftIcon, rightIcon, active, disabled, onClick, ...props }) => {
  const classNames = useMemo(() => {
    return twMerge(
      getDropdownItemDefaultStyles({ active, leftIcon, rightIcon, disabled }),
      className
    );
  }, [active, className, disabled, leftIcon, rightIcon]);

  return (
    <button
      role="menuitem"
      aria-pressed={active}
      aria-disabled={disabled ?? false}
      {...props}
      onClick={disabled ? undefined : onClick}
      className={classNames}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};
