import { FC, Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

interface IProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  classNameBackdrop?: string;
  classNameModal?: string;
}

export const Modal: FC<IProps> = ({
  open,
  children,
  onClose,
  classNameBackdrop,
  classNameModal,
}) => {
  const [bodyElement, setBodyElement] = useState<HTMLElement | null>(null);
  const modalBackdrop = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bodyElement) {
      setBodyElement(document.body);
    }
  }, [bodyElement]);

  useEffect(() => {
    const handleClickBackdrop = (event: MouseEvent) => {
      if (onClose && event.target === modalBackdrop.current) {
        onClose();
      }
    };

    const handlePressEscBackdrop = (event: KeyboardEvent) => {
      if (event.code === 'Escape' && onClose) {
        onClose();
      }
    };

    const removeEventListenerModal = () => {
      if (modalBackdrop.current) {
        modalBackdrop.current.removeEventListener('click', handleClickBackdrop);
      }
      document.removeEventListener('keydown', handlePressEscBackdrop);
    };

    if (bodyElement && open) {
      document.body.classList.add('overflow-hidden');
      if (modalBackdrop.current) {
        modalBackdrop.current.addEventListener('click', handleClickBackdrop);
        document.addEventListener('keydown', handlePressEscBackdrop);
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      removeEventListenerModal();
    }

    return () => {
      removeEventListenerModal();
    };
  }, [bodyElement, open]);

  const modal = (
    <AnimatePresence mode={'wait'}>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={modalBackdrop}
          className={twMerge(
            'absolute top-0 left-0 w-full h-screen bg-modal-backdrop z-1000 flex justify-center items-center',
            classNameBackdrop
          )}
        >
          <div
            className={twMerge(
              'relative inline-block bg-modal-bg border-2 overflow-auto border-modal-border z-1001 rounded-[10px]',
              classNameModal
            )}
          >
            {children}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return <Fragment>{bodyElement && createPortal(modal, bodyElement)}</Fragment>;
};
