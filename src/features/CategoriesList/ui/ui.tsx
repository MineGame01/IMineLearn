import { FC } from 'react';
import { Category } from '@features/Category';
import { CreateCategoryToolbar } from './create-category-toolbar';
import { getEnvVar } from '@shared/lib';

export const CategoriesList: FC = async () => {
  const response = await fetch(
    `${getEnvVar('NEXT_PUBLIC_REST_API_URL')}/categories?return_ids_only=true`
  );
  const data = (await response.json()) as string[] | { message: string };

  if (!response.ok) {
    const errorMessage = 'message' in data && data.message;

    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <CreateCategoryToolbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[50px]">
        {data &&
          Array.isArray(data) &&
          data.map((categoryId) => <Category key={categoryId} _id={categoryId} />)}
      </div>
    </div>
  );
};
