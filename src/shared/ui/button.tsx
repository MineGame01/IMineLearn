import { ButtonHTMLAttributes, FC, ReactNode, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement | null>,
  children: ReactNode;
  variant?: 'contained' | 'outlined';
}

export const Button: FC<IProps> = ({ children, className, variant = 'outlined', ...props }) => {
  return (
    <button
      className={twMerge(
        `cursor-pointer disabled:cursor-default transition-top duration-200 rounded-[10px] ease-in-out ${variant === 'outlined' ? 'border-transparent  border-2 hover:border-button-bg' : 'hover:opacity-[70%] disabled:opacity-[70%] bg-button-bg text-button-text'} w-full px-[13px] py-[8px]`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
