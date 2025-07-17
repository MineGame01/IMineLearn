import { NextResponse } from 'next/server';

export const setRefreshTokenCookie = (response: NextResponse, token: string) => {
  const maxAge = 1000 * 60 * 60 * 24 * 30;

  return response.cookies.set('refresh_token', token, {
    secure: process.env.NEXT_PUBLIC_DEVELOPMENT !== 'true',
    sameSite: 'strict',
    expires: new Date().getTime() + maxAge,
    priority: 'high',
    maxAge,
  });
};
