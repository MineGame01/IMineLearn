import { FC, HTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Paper } from '@shared/ui';

type TElement = HTMLAttributes<HTMLAnchorElement> & LinkProps;

interface IProps extends TElement {
  children: ReactNode;
  isPreview?: boolean;
}

export const Body: FC<IProps> = ({ children, className, isPreview, onClick, ...props }) => {
  return (
    <Paper
      className={`transition-box-shadow duration-100 ease-in-out ${isPreview ? 'h-auto bg-transparent border-transparent' : 'min-h-[280px] hover:shadow-2xl'}`}
    >
      <Link
        draggable={!isPreview}
        {...props}
        onClick={(event) => {
          isPreview && event.preventDefault();
          if (onClick) onClick(event);
        }}
        className={twMerge(`inline-block w-full ${isPreview ? 'cursor-default' : ''}`, className)}
      >
        {children}
      </Link>
    </Paper>
  );
};
