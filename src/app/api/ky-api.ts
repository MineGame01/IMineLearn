import ky from 'ky';

export const appApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_REST_API_URL,
  cache: 'force-cache',
});
