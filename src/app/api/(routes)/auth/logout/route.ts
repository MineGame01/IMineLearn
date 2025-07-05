import { NextResponse } from 'next/server';

const Logout = () => {
  const response = NextResponse.json('Logout successful!');
  response.cookies.delete('refresh_token');
  return response;
};

export const POST = Logout;
