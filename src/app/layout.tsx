'use client';
import React, { useEffect, FC, ReactNode, useRef } from 'react';
import { authLogin } from '@widgets/LoginModal';
import { Provider } from 'react-redux';
import { makeStore, TStore } from './../app/model';
import './ui/styles/default.css';
import { Header } from '@widgets/Header';
import { domAnimation, LazyMotion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<TStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(authLogin(null, null, null, 'checkSession'));
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>IMineLearn</title>
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <Provider store={storeRef.current}>
          <LazyMotion features={domAnimation} strict>
            <Header />
            <main>{children}</main>
          </LazyMotion>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
