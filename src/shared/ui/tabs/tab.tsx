'use client';
import { FC, HTMLAttributes, ReactNode, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import * as motion from 'motion/react-client';
import { TabOptionsContext } from './tabs-options-context';

interface IProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  attrButton?: HTMLAttributes<HTMLButtonElement>;
  children: ReactNode;
}

export const Tab: FC<IProps> = ({ children, attrButton, id, className, ...props }) => {
  const { currentTabId, onChange } = useContext(TabOptionsContext);

  const isSelect = id === currentTabId;

  return (
    <li {...props} className={twMerge('grow-1 relative', className)}>
      <button
        type="button"
        aria-selected={isSelect}
        role="tab"
        {...attrButton}
        onClick={(event) => {
          if (onChange) onChange(id);
          if (attrButton?.onClick) {
            attrButton.onClick(event);
          }
        }}
        className={twMerge(
          `${isSelect ? 'text-text' : 'text-muted hover:text-text'} p-3 text-nowrap w-full text-center cursor-pointer font-medium`,
          attrButton?.className
        )}
      >
        {children}
      </button>
      {isSelect && (
        <motion.div
          layoutId="underline"
          animate={{ y: '0px' }}
          className="bg-accent absolute bottom-0 w-full h-[3px]"
        />
      )}
    </li>
  );
};
