import { SkeletonCategory } from '@features/Category';
import { FC } from 'react';

export const SkeletonsCategories: FC = () => {
  return (
    <div>
      {Array(3)
        .fill(SkeletonCategory)
        .map((Skeleton, index) => (
          <Skeleton key={index} />
        ))}
    </div>
  );
};
