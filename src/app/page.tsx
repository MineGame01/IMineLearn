'use client';
import React from 'react';
import { CategoriesList } from '@features/CategoriesList';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl mb-2">Categories: </h1>
      <CategoriesList />
    </div>
  );
};

export default HomePage;
