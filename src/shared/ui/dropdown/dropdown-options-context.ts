import { createContext } from 'react';

interface IDropdownOptionsContext {
  open: boolean;
  close: (() => void) | null;
}

export const DropdownOptionsContext = createContext<IDropdownOptionsContext>({
  close: null,
  open: false,
});
