import dynamic from 'next/dynamic';
import { SkeletonsCategories } from './ui/skeletons-categories';

export const CategoriesList = dynamic(
  async () => import('./ui/ui').then((file) => file.CategoriesList),
  {
    loading: () => <SkeletonsCategories />,
  }
);

export * from './ui/skeletons-categories';
