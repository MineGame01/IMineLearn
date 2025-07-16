'use client';
import { createContext, Dispatch } from 'react';
import { TTabsPosition } from './tabs';

export const TabOptionsContext = createContext<{
  currentTabId: string | number | null;
  onChange: ((id: string | number) => void) | null;
  setTabsPosition: Dispatch<TTabsPosition> | null;
  tabsPosition: TTabsPosition;
}>({
  currentTabId: null,
  onChange: null,
  setTabsPosition: null,
  tabsPosition: [],
});
