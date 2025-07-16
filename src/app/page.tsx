import { SkeletonCategory } from '@features/categories-list';
import dynamic from 'next/dynamic';
import React from 'react';

const ServerCategoriesList = dynamic(
  async () => import('@features/categories-list').then((file) => file.CategoriesList),
  {
    loading: () => {
      return Array(3)
        .fill(SkeletonCategory)
        .map((Skeleton, index) => <Skeleton key={index} />);
    },
  }
);

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <ServerCategoriesList />
    </div>
  );
};

export default HomePage;
