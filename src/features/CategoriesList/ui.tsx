import { FC, useCallback, useState } from 'react';
import { Category, SkeletonCategory } from '@features/Category';
import { useGetCategoriesQuery } from '@app/api';
import { getServerErrorMessage } from '@shared/model';
import { Button } from '@shared/ui';
import { useAppSelector } from '@app/lib';
import { selectAuthUserInfo } from '@widgets/LoginModal';
import dynamic from 'next/dynamic';

const MemoCreateCategoryModal = dynamic(async () =>
  import('@widgets/CreateCategoryModal').then((file) => file.CreateCategoryModal)
);

export const CategoriesList: FC = () => {
  const { data, isError, isLoading, error } = useGetCategoriesQuery({
    return_ids_only: true,
  });
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const { is_admin } = useAppSelector(selectAuthUserInfo);

  const errorMessage = getServerErrorMessage(error);

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  const closeCreateCategoryModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  return (
    <div>
      {is_admin && (
        <Button
          variant="contained"
          className="w-auto"
          onClick={() => setShowCreateCategoryModal(true)}
        >
          New Category
        </Button>
      )}
      {is_admin && (
        <MemoCreateCategoryModal open={showCreateCategoryModal} close={closeCreateCategoryModal} />
      )}
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
    </div>
  );
};
