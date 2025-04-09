'use client';
import { Paper } from '@shared/ui';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export const Body: FC<IProps> = ({ children, href, className }) => {
  return (
    <Paper className="transform-box-shadow duration-100 ease-in-out hover:shadow-2xl">
      <Link href={href} className={twMerge('flex items-center p-3 ', className)}>
        {children}
      </Link>
    </Paper>
  );
};
