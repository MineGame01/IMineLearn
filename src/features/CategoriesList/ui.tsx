import { FC } from 'react';
import { Category } from '@features/Category';
import { useGetCategoriesQuery } from '@app/api';

export const CategoriesList: FC = () => {
  const { data, isError, isLoading } = useGetCategoriesQuery({
    return_ids_only: true,
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[50px]">
      {data &&
        Array.isArray(data) &&
        data.map((categoryId) => (
          <Category key={categoryId as string} _id={categoryId as string} />
        ))}
    </div>
  );
};
