'use client';
import { topicsApi } from '@entities/Topic/api/topics-api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FC } from 'react';

const Loading: FC = () => {
  const { categoryId } = useParams();
  const category_id = Array.isArray(categoryId) ? categoryId[0] : categoryId;

  useQuery({
    queryFn: () => topicsApi.getTopics({ category_id: category_id }),
    queryKey: ['topics', categoryId],
    enabled: Boolean(category_id),
  });

  return <div></div>;
};

export default Loading;
