'use client';
import Link from 'next/link';
import { AnchorHTMLAttributes, FC, useMemo } from 'react';
import { getDropdownItemDefaultStyles, IDropdownItemDefaultProps } from './dropdown-item';
import { twMerge } from 'tailwind-merge';
import LinkIcon from '@mui/icons-material/Link';

export const DropdownItemLink: FC<
  Pick<IDropdownItemDefaultProps, 'leftIcon' | 'rightIcon' | 'disabled'> & {
    href: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ disabled, leftIcon, rightIcon, className, onClick, href, children, ...props }) => {
  const classNames = useMemo(() => {
    return twMerge(getDropdownItemDefaultStyles({ leftIcon, rightIcon, disabled }), className);
  }, [className]);

  return (
    <Link
      role="menuitem"
      href={href}
      aria-disabled={disabled ?? false}
      {...props}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
        }
        if (onClick) onClick(event);
      }}
      className={classNames}
    >
      {leftIcon}
      {children}
      <LinkIcon className="ml-1 text-muted" fontSize="inherit" />
      {rightIcon}
    </Link>
  );
};
