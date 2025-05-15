import { Skeleton } from '@shared/ui';
import { FC, useMemo } from 'react';

export const SkeletonTopic: FC = () => {
  const MAX_SKELETON_LINES = 10;
  const DEFAULT_LINE_WIDTH = 100;

  const skeletonLinesWidths = useMemo(() => {
    const count: number[] = [];
    let width = DEFAULT_LINE_WIDTH;
    for (let i = 1; i <= MAX_SKELETON_LINES; i++) {
      count.push(width - 10);
      width = width - 10;
    }
    return count;
  }, [MAX_SKELETON_LINES, DEFAULT_LINE_WIDTH]);

  return (
    <div className="mt-5">
      <div>
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div className="flex mt-5 items-center gap-x-4">
        <Skeleton className="w-[42px] h-[42px] rounded-full" />
        <Skeleton className="w-full" />
      </div>
      <div>
        {skeletonLinesWidths.map((width) => (
          <Skeleton key={width} className="w-auto mt-3" style={{ width: String(width) + '%' }} />
        ))}
      </div>
    </div>
  );
};
