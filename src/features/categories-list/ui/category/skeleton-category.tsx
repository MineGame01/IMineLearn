import { FC } from 'react';
import { Container } from './container';
import { Skeleton } from '@shared/ui';
import { ContentContainer } from './content-container';

export const SkeletonCategory: FC = () => {
  return (
    <Container>
      <div className="w-full h-[80px] overflow-hidden rounded-default-radius">
        <Skeleton className="w-full h-full" />
      </div>
      <ContentContainer>
        <Skeleton className="w-full h-[20px]" />
        <Skeleton className="w-full h-[20px]" />
      </ContentContainer>
      <Skeleton className="w-full mt-3 h-[50px]" />
    </Container>
  );
};
