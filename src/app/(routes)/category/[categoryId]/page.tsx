'use client';
import { FC } from 'react';
import { TopicsList } from '@features/TopicList';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CategoryPhotoContainer } from '@features/categories-list';
import { categoriesApi } from '@entities/categories-list/api/categories-api';
import { useQuery } from '@tanstack/react-query';
import { selectAuthUserProfile, useAuthStore } from '@entities/auth';

const MemoModerationToolbar = dynamic(
  async () => import('./ui/moderation-toolbar').then((file) => file.ModerationToolbar),
  {
    loading: () => <div></div>,
  }
);

const CategoryPage: FC = () => {
  const { categoryId: category_id_param } = useParams();
  const category_id = Array.isArray(category_id_param) ? category_id_param[0] : category_id_param;

  const {
    isPending,
    data: category,
    isError,
    error,
  } = useQuery({
    queryFn: () => categoriesApi.getCategoryById(category_id ?? ''),
    queryKey: ['category', category_id],
    enabled: Boolean(category_id),
  });

  const authUserProfile = useAuthStore(selectAuthUserProfile);

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const { id, name, image_base64_1200x } = category;

  const image_src = image_base64_1200x ? `data:image/png;base64,${image_base64_1200x}` : null;

  return (
    <div className="container mx-auto">
      <CategoryPhotoContainer className="m-5" categoryName={name} src={image_src} />
      {authUserProfile?.is_admin && <MemoModerationToolbar category_id={id} />}
      <TopicsList categoryId={id} />
    </div>
  );
};

export default CategoryPage;
