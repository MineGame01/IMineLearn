import { Skeleton } from '@shared/ui';
import { FC, useMemo } from 'react';

const MAX_SKELETON_LINES = 10;
const DEFAULT_LINE_WIDTH = 100;

export const SkeletonTopic: FC = () => {
  const skeletonLinesWidths = useMemo(() => {
    const count: number[] = [];
    let width = DEFAULT_LINE_WIDTH;
    for (let i = 1; i <= MAX_SKELETON_LINES; i++) {
      count.push(width - 10);
      width = width - 10;
    }
    return count;
  }, []);

  return (
    <div className="mt-5">
      <div>
        <Skeleton className="bg-background w-full h-[50px]" />
      </div>
      <div className="flex mt-5 items-center gap-x-4">
        <Skeleton className="bg-background w-[42px] h-[42px] rounded-full" />
        <Skeleton className="bg-background w-full" />
      </div>
      <div>
        {skeletonLinesWidths.map((width) => (
          <Skeleton
            key={width}
            className="bg-background w-auto mt-3"
            style={{ width: String(width) + '%' }}
          />
        ))}
      </div>
    </div>
  );
};
