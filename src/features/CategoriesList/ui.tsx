import { FC } from 'react';
import { Category, SkeletonCategory } from '@features/Category';
import { useGetCategoriesQuery } from '@app/api';
import { getServerErrorMessage } from '@shared/model';

export const CategoriesList: FC = () => {
  const { data, isError, isLoading, error } = useGetCategoriesQuery({
    return_ids_only: true,
  });

  const errorMessage = getServerErrorMessage(error);

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[50px]">
      {data &&
        Array.isArray(data) &&
        data.map((categoryId) => (
          <Category key={categoryId as string} _id={categoryId as string} />
        ))}
      {isLoading &&
        [SkeletonCategory, SkeletonCategory, SkeletonCategory].map((Skeleton, index) => (
          <Skeleton key={index} />
        ))}
    </div>
  );
};
