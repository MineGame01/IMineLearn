import { FC, ReactNode, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import RefreshIcon from '@mui/icons-material/Refresh';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const IconButton: FC<IProps> = ({ children, className, isLoading, ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        'cursor-pointer inline-flex items-center disabled:cursor-default p-1 rounded-full',
        className
      )}
    >
      {isLoading ? <RefreshIcon className="animate-spin" /> : children}
    </button>
  );
};
