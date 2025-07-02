import { FC, HTMLAttributes, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  ref?: RefObject<HTMLButtonElement | null>;
}

export const ButtonToolEditor: FC<IProps> = ({ active, children, ...props }) => {
  return (
    <button
      aria-pressed={active}
      {...props}
      className={twMerge(
        'p-2 not-[disabled]:cursor-pointer',
        active && 'bg-black/10',
        props.className
      )}
    >
      {children}
    </button>
  );
};
