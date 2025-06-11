import { FC } from 'react';
import { CategoriesToolbar } from './categories-toolbar';
import dynamic from 'next/dynamic';
import { SkeletonCategory } from './category/skeleton-category';
import { ResponseError } from '@shared/model';
import { ContainerErrorLayout, ErrorLayout } from '@shared/ui';
import { categoriesApi } from '@entities/categories-list/api/categories-api';

const ServerCategory = dynamic(
  async () => import('./category/category').then((file) => file.Category),
  {
    loading: () => <SkeletonCategory />,
  }
);

export const CategoriesList: FC = async () => {
  try {
    const data = (await categoriesApi.getCategories({ return_ids_only: true })) as string[];

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
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      return (
        <ContainerErrorLayout>
          <ErrorLayout message={error.message} type_error={error.code} />
        </ContainerErrorLayout>
      );
    } else {
      throw error;
    }
  }
};
