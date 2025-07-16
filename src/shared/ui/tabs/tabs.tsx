'use client';
import { FC, ReactNode, useState, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TabOptionsContext } from './tabs-options-context';

interface IProps {
  onChange: (id: string | number) => void;
  currentTabId: string | number;
  children: ReactNode;
  className?: string;
}

export type TTabsPosition = {
  id: string | number;
  left: number;
  width: number;
}[];

export const Tabs: FC<IProps> = ({ onChange, currentTabId, children, className }) => {
  const [tabsPosition, setTabsPosition] = useState<TTabsPosition>([]);
  const containerRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className={twMerge('overflow-x-auto', className)}>
      <ul ref={containerRef} role="tablist" className={'relative flex'}>
        <TabOptionsContext.Provider
          value={{ currentTabId, onChange, setTabsPosition, tabsPosition }}
        >
          {children}
        </TabOptionsContext.Provider>
      </ul>
    </div>
  );
};
