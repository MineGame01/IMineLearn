import { ButtonHTMLAttributes, FC, ReactNode, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-client';
import { buttonStyleSelectors } from './button-style-selectors';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
  variant?: 'contained' | 'outlined';
  loading?: boolean;
}

export const Button: FC<IProps> = ({
  children,
  className,
  variant = 'outlined',
  loading,
  ...props
}) => {
  const loadingStatus = (
    <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <RefreshIcon className="animate-spin" />
    </m.span>
  );

  return (
    <button
      disabled={loading}
      {...props}
      aria-label={loading ? 'Loading' : props['aria-label']}
      className={twMerge(
        buttonStyleSelectors.default,
        buttonStyleSelectors.disabled,
        buttonStyleSelectors[variant],
        className
      )}
    >
      {children} <AnimatePresence mode="wait">{loading && loadingStatus}</AnimatePresence>
    </button>
  );
};
