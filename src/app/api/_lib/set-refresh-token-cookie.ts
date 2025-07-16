import { NextResponse } from 'next/server';

export const setRefreshTokenCookie = (response: NextResponse, token: string) => {
  return response.cookies.set('refresh_token', token, {
    secure: process.env.NEXT_PUBLIC_DEVELOPMENT !== 'true',
    sameSite: 'strict',
    expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
    priority: 'high',
  });
};
