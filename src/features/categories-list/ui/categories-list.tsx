import { FC } from 'react';
import { CategoriesToolbar } from './categories-toolbar';
import dynamic from 'next/dynamic';
import { SkeletonCategory } from './category/skeleton-category';
import { appApi } from '@app/api';
import { HTTPError } from 'ky';
import { IServerErrorResponse, PageError } from '@shared/model';

const ServerCategory = dynamic(
  async () => import('./category/category').then((file) => file.Category),
  {
    loading: () => <SkeletonCategory />,
  }
);

export const CategoriesList: FC = async () => {
  let data: string[] | null = null;

  try {
    data = await appApi
      .get('categories', {
        next: { tags: ['refetch-categories-list'] },
        searchParams: { return_ids_only: 'sdsd' },
      })
      .json<string[]>();
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      const messageResponse = (await error.response.json<IServerErrorResponse>()).message;
      throw new PageError('FAILED-LOAD-CATEGORIES', messageResponse);
    } else {
      throw error;
    }
  }

  return (
    <div>
      <CategoriesToolbar />
      <div className="grid grid-cols-1 p-1 lg-p-2 lg:grid-cols-3 gap-[20px] lg:gap-[50px]">
        {data.map((categoryId) => (
          <ServerCategory key={categoryId} id={categoryId} />
        ))}
      </div>
    </div>
  );
};
