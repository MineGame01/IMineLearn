import { AnchorHTMLAttributes, FC } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';
import { buttonStyleSelectors } from './button/button-style-selectors';

type TLinkAttributes = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

interface IProps extends TLinkAttributes {
  variant?: 'underline' | 'contained' | 'outlined';
}

export const Link: FC<IProps> = ({ children, className, variant = 'underline', ...props }) => {
  return (
    <NextLink
      {...props}
      className={twMerge(
        'text-center',
        variant !== 'underline' ? buttonStyleSelectors.default : 'hover:underline',
        variant === 'contained' && buttonStyleSelectors.contained,
        variant === 'outlined' && buttonStyleSelectors.outlined,
        className
      )}
    >
      {children}
    </NextLink>
  );
};
