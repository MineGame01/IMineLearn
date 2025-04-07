import { FC } from 'react';
import { Category } from '@features/Category';
import { TopicsList } from '@features/TopicList';
import { useParams } from 'next/navigation';

export const CategoryPage: FC = () => {
  const { categoryId } = useParams();

  if (!categoryId || typeof categoryId !== 'string') {
    return <div>category id not found!</div>;
  }

  return (
    <div className="container mx-auto">
      <Category _id={categoryId} isPreview={true} />
      <TopicsList categoryId={categoryId} />
    </div>
  );
};
