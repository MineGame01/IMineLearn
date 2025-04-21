'use client';
import { FC } from 'react';
import { Category } from '@features/Category';
import { TopicsList } from '@features/TopicList';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@app/lib';
import { selectAuthUserInfo } from '@widgets/LoginModal';

const MemoModerationToolbar = dynamic(async () =>
  import('./ui/moderation-toolbar').then((file) => file.ModerationToolbar)
);

const CategoryPage: FC = () => {
  const { categoryId } = useParams();
  const { is_admin } = useAppSelector(selectAuthUserInfo);

  if (!categoryId || typeof categoryId !== 'string') {
    return <div>category id not found!</div>;
  }

  return (
    <div className="container mx-auto">
      <Category _id={categoryId} isPreview={true} />
      {is_admin && <MemoModerationToolbar category_id={categoryId} />}
      <TopicsList categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;
