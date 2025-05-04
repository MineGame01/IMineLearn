import { FC } from 'react';
import { CreateCategoryToolbar } from './create-category-toolbar';
import { getEnvVar } from '@shared/lib';
import dynamic from 'next/dynamic';
import { SkeletonCategory } from '@features/Category';

const ServerCategory = dynamic(
  async () => import('@features/Category').then((file) => file.Category),
  {
    loading: () => {
      return <SkeletonCategory />;
    },
  }
);

export const CategoriesList: FC = async () => {
  const response = await fetch(
    `${getEnvVar('NEXT_PUBLIC_REST_API_URL')}/categories?return_ids_only=true`,
    {
      cache: 'no-store',
    }
  );
  const data = (await response.json()) as string[] | { message: string };

  if (!response.ok) {
    const errorMessage = 'message' in data && data.message;

    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <CreateCategoryToolbar />
      <div className="grid grid-cols-1 p-1 lg-p-2 lg:grid-cols-3 gap-[20px] lg:gap-[50px]">
        {data &&
          Array.isArray(data) &&
          data.map((categoryId) => <ServerCategory key={categoryId} _id={categoryId} />)}
      </div>
    </div>
  );
};
