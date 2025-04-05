import { FC, HTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

type TElement = HTMLAttributes<HTMLAnchorElement> & LinkProps;

interface IProps extends TElement {
  children: ReactNode;
  isPreview?: boolean;
}

export const Body: FC<IProps> = ({ children, className, isPreview, onClick, ...props }) => {
  return (
    <Link
      draggable={!isPreview}
      {...props}
      onClick={(event) => {
        isPreview && event.preventDefault();
        if (onClick) onClick(event);
      }}
      className={twMerge(
        `inline-block transition-box-shadow duration-100 ease-in-out ${isPreview ? 'h-auto cursor-default' : 'min-h-[280px] bg-surface border-2 border-border hover:shadow-2xl'}  rounded-border-default w-full`,
        className
      )}
    >
      {children}
    </Link>
  );
};
