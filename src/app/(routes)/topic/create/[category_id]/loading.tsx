'use client';

import { categoriesApi } from '@entities/categories-list/api/categories-api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FC } from 'react';

const Loading: FC = () => {
  const { category_id: category_id_param } = useParams();

  const category_id = Array.isArray(category_id_param) ? category_id_param[0] : category_id_param;

  useQuery({
    queryFn: () => categoriesApi.getCategoryById(category_id ?? ''),
    queryKey: ['category', category_id],
    enabled: Boolean(category_id),
  });

  return <div></div>;
};

export default Loading;
