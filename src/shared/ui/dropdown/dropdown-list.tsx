'use client';
import { FC, HTMLAttributes, ReactNode, useRef, useEffect, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { DropdownOptionsContext } from './dropdown-options-context';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const DropdownList: FC<IProps> = ({ children, className, ...props }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const dropdownOptions = useContext(DropdownOptionsContext);

  useEffect(() => {
    const handleClick = () => {
      const { close } = dropdownOptions;
      if (close) close();
    };

    const list = listRef.current;

    list?.addEventListener('click', handleClick);
    return () => {
      list?.removeEventListener('click', handleClick);
    };
  }, [dropdownOptions]);

  useEffect(() => {
    const list = listRef.current;
    const firstListItem = list?.firstElementChild;

    const isAllowedElement = (
      element?: HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | EventTarget | null
    ) => {
      return element instanceof HTMLButtonElement || element instanceof HTMLAnchorElement;
    };

    if (!isAllowedElement(firstListItem)) return;

    firstListItem.focus();

    const handleKeyup = (event: KeyboardEvent) => {
      const isArrowUpEventCode = event.code === 'ArrowUp';
      const isArrowDownEventCode = event.code === 'ArrowDown';

      if (isArrowUpEventCode || isArrowDownEventCode) event.preventDefault();

      const listItemFocused = event.target;

      if (!isAllowedElement(listItemFocused)) {
        const firstListItem = list?.firstElementChild;
        if (isAllowedElement(firstListItem)) firstListItem.focus();
        return;
      }

      const { previousElementSibling, nextElementSibling } = listItemFocused;

      const previousListItem = isAllowedElement(previousElementSibling) && previousElementSibling;
      const nextListItem = isAllowedElement(nextElementSibling) && nextElementSibling;

      if (event.code === 'ArrowUp' && previousListItem) {
        previousListItem.focus();
      } else if (event.code === 'ArrowDown' && nextListItem) {
        nextListItem.focus();
      }
    };

    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return (
    <div
      ref={listRef}
      role="menu"
      aria-haspopup="menu"
      {...props}
      className={twMerge('flex flex-col gap-y-0.5', className)}
    >
      {children}
    </div>
  );
};
