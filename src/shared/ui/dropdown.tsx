import { AnimatePresence } from 'motion/react';
import { FC, ReactNode, RefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as m from 'motion/react-m';

interface IProps {
  anchorEl: RefObject<HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | null>;
  open: boolean;
  close: () => void;
  children: ReactNode;
}

export const Dropdown: FC<IProps> = ({ anchorEl, children, open, close }) => {
  const [position, setPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [bodyElement, setBodyElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!bodyElement) {
      setBodyElement(document.body);
    }
  }, [bodyElement]);

  useEffect(() => {
    const handleResize = () => {
      if (anchorEl.current) {
        const { left, top } = anchorEl.current.getBoundingClientRect();
        setPosition({
          top,
          left,
        });
      }
    };

    const removeEventListener = () => {
      window.removeEventListener('resize', handleResize);
    };

    window.addEventListener('resize', handleResize);

    if (!open) {
      removeEventListener();
    } else {
      handleResize();
    }

    return () => {
      removeEventListener();
    };
  }, [anchorEl, open]);

  const dropdown = (
    <AnimatePresence mode="wait">
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => close()}
          className="absolute z-900 top-0 left-0 w-full h-full"
        >
          <div
            style={{ top: `${position.top + 45}px`, left: `${position.left}px` }}
            onClick={(event) => event.stopPropagation()}
            className="bg-modal-bg shadow-2xl border-2 origin-top border-modal-border rounded-border-default p-1 absolute min-w-[100px]"
          >
            {children}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return bodyElement && createPortal(dropdown, bodyElement);
};
