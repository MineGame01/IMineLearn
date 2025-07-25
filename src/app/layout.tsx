'use client';
import './ui/styles/default.css';
import React, { useEffect, FC, ReactNode, useRef, useState, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, TStore } from './../app/model';
import { Header } from '@widgets/Header';
import { Analytics } from '@vercel/analytics/react';
import { TechWorkPage } from './tech-work-page';
import { Inter } from 'next/font/google';
import { getDatabase, ref, onValue } from 'firebase/database';
import { twMerge } from 'tailwind-merge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { authApiHooks } from '@entities/auth/api/auth-api-hooks';

const InterFont = Inter({
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
});

type TIsTechWork = null | boolean;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<TStore>(null);
  const queryClientRef = useRef<QueryClient>(null);
  const [isTechWork, setIsTechWork] = useState<TIsTechWork>(false);

  storeRef.current ??= makeStore();
  queryClientRef.current ??= new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60,
      },
      mutations: {
        retry: 1,
      },
    },
  });

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEVELOPMENT !== 'true') {
      const db = getDatabase();
      const techWorkRef = ref(db, '/tech_work');
      onValue(techWorkRef, (snapshot) => {
        const data = snapshot.val() as boolean;
        setIsTechWork(data);
      });
    }
  }, [setIsTechWork]);

  const { mutateAsync: refreshTokenMutate } = authApiHooks.useRefreshTokenMutation(
    undefined,
    queryClientRef.current
  );

  useEffect(() => {
    const refreshToken = async () => {
      if (window.document.cookie.split(';').some((cookie) => cookie.includes('refresh_token'))) {
        await refreshTokenMutate();
      }
    };
    void refreshToken();
  }, [refreshTokenMutate]);

  return (
    <html lang="en" className={twMerge(InterFont.className, 'text-[0.9rem]')}>
      <head>
        <title>IMineLearn</title>
      </head>
      <body className="h-full">
        <Analytics />
        <StrictMode>
          {isTechWork === false && (
            <Provider store={storeRef.current}>
              <QueryClientProvider client={queryClientRef.current}>
                <Header />
                <main>{children}</main>
              </QueryClientProvider>
            </Provider>
          )}
          {isTechWork === true && <TechWorkPage />}
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
