'use client';
import { FC, HTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Paper } from '@shared/ui';

type TElement = HTMLAttributes<HTMLAnchorElement> & LinkProps;

interface IProps extends TElement {
  children: ReactNode;
}

export const Body: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <Paper
      className={'transition-box-shadow duration-100 ease-in-out min-h-[280px] hover:shadow-2xl'}
    >
      <Link {...props} className={twMerge('inline-block w-full', className)}>
        {children}
      </Link>
    </Paper>
  );
};
