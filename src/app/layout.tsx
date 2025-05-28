'use client';
import './ui/styles/default.css';
import React, { useEffect, FC, ReactNode, useRef, useState, StrictMode } from 'react';
import { authLogin } from '@widgets/LoginModal';
import { Provider } from 'react-redux';
import { makeStore, TStore } from './../app/model';
import { Header } from '@widgets/Header';
import { domAnimation, LazyMotion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
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
    const db = getDatabase();
    const techWorkRef = ref(db, '/tech_work');
    onValue(techWorkRef, (snapshot) => {
      const data = snapshot.val() as boolean;
      setIsTechWork(data);
    });
  }, [setIsTechWork]);

  useEffect(() => {
    if (storeRef.current) {
      const store = storeRef.current;
      store.dispatch(authLogin(null, null, null, 'checkSession'));
    }
  }, []);

  return (
    <html lang="en" className={(twMerge(InterFont.className), 'text-[0.9rem] lg:text-[1rem]')}>
      <head>
        <title>IMineLearn</title>
      </head>
      <body className="h-full">
        <Analytics />
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
