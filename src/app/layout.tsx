'use client';
import './ui/styles/default.css';
import React, { useEffect, FC, ReactNode, useRef, useState, StrictMode } from 'react';
import { authLogin } from '@widgets/LoginModal';
import { Provider } from 'react-redux';
import { makeStore, TStore } from './../app/model';
import { Header } from '@widgets/Header';
import { domAnimation, LazyMotion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { TechWorkPage } from './tech-work-page';
import { Inter } from 'next/font/google';
import { getDatabase, ref, onValue } from 'firebase/database';
import { twMerge } from 'tailwind-merge';

const InterFont = Inter({
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
});

type TIsTechWork = null | boolean;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<TStore | null>(null);
  const [isTechWork, setIsTechWork] = useState<TIsTechWork>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      const store = storeRef.current;

      let isTechWork: TIsTechWork = null;

      const db = getDatabase();
      const techWorkRef = ref(db, '/tech_work');
      onValue(techWorkRef, (snapshot) => {
        const data = snapshot.val() as boolean;
        setIsTechWork(data);
        isTechWork = data;
      });

      isTechWork === false && store.dispatch(authLogin(null, null, null, 'checkSession'));
    }
  }, [setIsTechWork]);

  return (
    <html lang="en" className={(twMerge(InterFont.className), 'text-[1rem] lg:text-[initial]')}>
      <head>
        <title>IMineLearn</title>
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <StrictMode>
          {isTechWork === false && (
            <Provider store={storeRef.current}>
              <LazyMotion features={domAnimation} strict>
                <Header />
                <main>{children}</main>
              </LazyMotion>
            </Provider>
          )}
          {isTechWork === true && <TechWorkPage />}
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
