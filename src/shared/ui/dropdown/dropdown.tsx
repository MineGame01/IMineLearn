'use client';
import { AnimatePresence } from 'motion/react';
import { FC, ReactNode, RefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as m from 'motion/react-m';
import { DropdownOptionsContext } from './dropdown-options-context';

interface IProps {
  anchorEl: RefObject<HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | null>;
  open: boolean;
  close: () => void;
  children: ReactNode;
  id?: string;
}

export const Dropdown: FC<IProps> = ({ anchorEl, children, open, close, id }) => {
  const [position, setPosition] = useState<{ left: number; bottom: number }>({
    left: 0,
    bottom: 0,
  });

  useEffect(() => {
    const anchor = anchorEl.current;
    const body = document.body;

    const handleResize = () => {
      if (anchor) {
        const { left, bottom } = anchor.getBoundingClientRect();
        setPosition({
          bottom,
          left,
        });
      }
    };

    const handlePressEscKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        close();
      }
    };

    const removeAllEventListener = () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keyup', handlePressEscKey);
    };

    const removeAllChanges = () => {
      body.classList.remove('overflow-hidden');
      removeAllEventListener();
    };

    if (open) {
      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('keyup', handlePressEscKey);
      body.classList.add('overflow-hidden');
    } else {
      removeAllChanges();
    }

    return () => {
      removeAllChanges();
    };
  }, [anchorEl, close, open]);

  const dropdown = (
    <AnimatePresence mode="wait">
      {open && (
        <m.div
          id={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            close();
          }}
          className="absolute z-900 top-0 left-0 w-full h-full"
        >
          <div
            style={{ top: `${String(position.bottom)}px`, left: `${String(position.left)}px` }}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="bg-modal-bg shadow-2xl border-2 origin-top border-modal-border rounded-border-default p-1 absolute min-w-[100px]"
          >
            <DropdownOptionsContext.Provider value={{ close, open }}>
              {children}
            </DropdownOptionsContext.Provider>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return createPortal(dropdown, document.body);
};
