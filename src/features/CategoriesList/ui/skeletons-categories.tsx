import { SkeletonCategory } from '@features/Category';
import { FC } from 'react';

export const SkeletonsCategories: FC = () => {
  return (
    <div>
      {[SkeletonCategory, SkeletonCategory, SkeletonCategory].map((Skeleton, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};
