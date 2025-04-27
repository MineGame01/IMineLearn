import { ButtonHTMLAttributes, FC, ReactNode, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

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
  const styles = {
    default:
      'cursor-pointer font-medium transition-top duration-200 rounded-border-default ease-in-out px-[13px] py-[8px] w-full',
    contained: 'hover:opacity-[70%] bg-button-bg text-button-text',
    disabled: 'disabled:cursor-default disabled:opacity-[70%] disabled:hover:border-transparent',
    outlined: 'border-transparent border-2 hover:border-button-bg',
  };

  const loadingStatus = (
    <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <RefreshIcon className="animate-spin" />
    </m.span>
  );

  return (
    <button
      className={twMerge(`${styles.disabled} ${styles.default} ${styles[variant]}`, className)}
      disabled={loading}
      {...props}
    >
      {children} <AnimatePresence mode="wait">{loading && loadingStatus}</AnimatePresence>
    </button>
  );
};
