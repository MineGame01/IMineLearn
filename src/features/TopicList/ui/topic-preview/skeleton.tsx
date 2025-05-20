import { Skeleton } from '@shared/ui';
import { FC } from 'react';

export const TopicPreviewSkeleton: FC = () => {
  return (
    <div className="flex items-center p-3">
      <div>
        <Skeleton className="w-[42px] h-[42px] rounded-full" />
      </div>
      <div className="w-full ml-2 h-full flex flex-col">
        <Skeleton className="h-[15px] w-[100px]" />
        <Skeleton className="w-full mt-1" />
      </div>
    </div>
  );
};
