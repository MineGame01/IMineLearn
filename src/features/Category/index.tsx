import dynamic from 'next/dynamic';
import { SkeletonCategory } from './ui/skeleton-category.tsx';

export const Category = dynamic(
  async () => import('./ui/category.tsx').then((file) => file.Category),
  {
    loading: () => <SkeletonCategory />,
  }
);

export * from './ui/skeleton-category.tsx';
export * from './ui/category-photo-container.tsx';
