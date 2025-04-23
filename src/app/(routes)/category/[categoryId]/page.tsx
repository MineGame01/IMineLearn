'use client';
import { FC } from 'react';
import { TopicsList } from '@features/TopicList';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@app/lib';
import { selectAuthUserInfo } from '@widgets/LoginModal';
import { useGetCategoriesQuery } from '@app/api';
import { getServerErrorMessage } from '@shared/model';
import { ICategory } from '@entities/Category';
import { CategoryPhotoContainer } from '@features/Category';

const MemoModerationToolbar = dynamic(async () =>
  import('./ui/moderation-toolbar').then((file) => file.ModerationToolbar)
);

const CategoryPage: FC = () => {
  const { categoryId: category_id_param } = useParams();
  const category_id = Array.isArray(category_id_param) ? category_id_param[0] : category_id_param;
  const { is_admin } = useAppSelector(selectAuthUserInfo);
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery({ category_id: category_id }, { skip: !category_id });

  const errorMessage = getServerErrorMessage(error);

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (category) {
    const { _id, name, image_base64_1200x } = category as ICategory;

    const image_src = image_base64_1200x ? `data:image/png;base64,${image_base64_1200x}` : null;

    return (
      <div className="container mx-auto">
        <CategoryPhotoContainer className="m-5" categoryName={name} src={image_src} />
        {is_admin && <MemoModerationToolbar category_id={_id} />}
        <TopicsList categoryId={_id} />
      </div>
    );
  }
};

export default CategoryPage;
