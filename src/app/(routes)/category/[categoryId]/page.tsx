'use client';
import dynamic from 'next/dynamic';

export default dynamic(async () => import('./index').then((el) => el.CategoryPage));
