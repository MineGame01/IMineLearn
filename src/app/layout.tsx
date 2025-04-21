'use client';
import React, { useEffect, FC, ReactNode, useRef, useState, StrictMode } from 'react';
import { authLogin } from '@widgets/LoginModal';
import { Provider } from 'react-redux';
import { makeStore, TStore } from './../app/model';
import './ui/styles/default.css';
import { Header } from '@widgets/Header';
import { domAnimation, LazyMotion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ForumApi } from './api';
import { TechWorkPage } from './tech-work-page';
import { Inter } from 'next/font/google';

const InterFont = Inter({
  display: 'swap',
});

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<TStore | null>(null);
  const [isTechWork, setIsTechWork] = useState(false);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      const store = storeRef.current;

      store.dispatch(authLogin(null, null, null, 'checkSession'));
      const actionGetConsoleParamCreator = ForumApi.endpoints.getConsoleParam.initiate;

      const getIsTechWork = async () => {
        try {
          const value = await store
            .dispatch(actionGetConsoleParamCreator({ field: 'tech_work' }))
            .unwrap();
          setIsTechWork(value as boolean);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            throw error;
          }
        }
      };

      void getIsTechWork();

      setInterval(
        () => {
          void getIsTechWork();
        },
        1000 * 60 * 5
      );
    }
  }, []);

  return (
    <html lang="en" className={InterFont.className}>
      <head>
        <title>IMineLearn</title>
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <StrictMode>
          {!isTechWork && (
            <Provider store={storeRef.current}>
              <LazyMotion features={domAnimation} strict>
                <Header />
                <main>{children}</main>
              </LazyMotion>
            </Provider>
          )}
          {isTechWork && <TechWorkPage />}
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
