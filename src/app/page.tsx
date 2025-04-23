import { CategoriesList } from '@features/CategoriesList';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <CategoriesList />
    </div>
  );
};

export default HomePage;
