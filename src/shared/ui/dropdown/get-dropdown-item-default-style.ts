import { twMerge } from 'tailwind-merge';
import { IDropdownItemDefaultProps } from './dropdown-item';

export const getDropdownItemDefaultStyles = ({
  active,
  disabled,
  leftIcon,
  rightIcon,
}: Pick<IDropdownItemDefaultProps, 'leftIcon' | 'rightIcon' | 'active' | 'disabled'>) => {
  return twMerge(
    'px-2 py-1 rounded-[5px] relative text-[0.9rem] text-start outline-0 cursor-pointer',
    `before:transition-colors before:duration-100 before:ease-in-out hover:before:bg-accent before:content-[' '] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:opacity-10 before:rounded-border-default`,
    'focus-visible:outline-2',
    active && 'bg-accent text-white',
    disabled && 'cursor-default before:bg-accent',
    leftIcon && '*:first:mr-1',
    rightIcon && '*:last:ml-1'
  );
};
