'use client';
import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IDropdownItemDefaultProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  active?: boolean;
  href?: string;
  disabled?: boolean;
}

export const getDropdownItemDefaultStyles = ({
  active,
  disabled,
  leftIcon,
  rightIcon,
}: Pick<IDropdownItemDefaultProps, 'leftIcon' | 'rightIcon' | 'active' | 'disabled'>) => {
  return twMerge(
    'px-2 py-1 rounded-[5px] relative text-[0.9rem] text-start outline-0 cursor-pointer',
    `before:transition-colors before:duration-100 before:ease-in-out hover:before:bg-accent before:content-[' '] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-10 before:rounded-border-default`,
    'focus-visible:outline-2',
    active && 'bg-accent text-white',
    disabled && 'cursor-default before:bg-accent',
    leftIcon && '*:first:mr-1',
    rightIcon && '*:last:ml-1'
  );
};

export const DropdownItem: FC<
  Pick<IDropdownItemDefaultProps, 'leftIcon' | 'rightIcon' | 'active' | 'disabled'> &
    ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, leftIcon, rightIcon, active, disabled, onClick, ...props }) => {
  const classNames = useMemo(() => {
    return twMerge(
      getDropdownItemDefaultStyles({ active, leftIcon, rightIcon, disabled }),
      className
    );
  }, [className]);

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
