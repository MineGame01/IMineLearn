import { SkeletonsCategories } from '@features/CategoriesList';
import dynamic from 'next/dynamic';
import React from 'react';

const ServerCategoriesList = dynamic(
  async () => import('@features/CategoriesList').then((file) => file.CategoriesList),
  {
    loading: () => {
      return <SkeletonsCategories />;
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
