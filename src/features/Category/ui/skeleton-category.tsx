import { FC } from 'react';
import { Body } from './body';
import { Container } from './container';
import { PhotoContainer } from './photo-container';
import { Skeleton } from '@shared/ui';
import { ContentContainer } from './content-container';

export const SkeletonCategory: FC = () => {
  return (
    <Body href={'#'} isPreview>
      <Container>
        <PhotoContainer>
          <Skeleton className="w-full h-full" />
        </PhotoContainer>
        <ContentContainer>
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
        </ContentContainer>
        <Skeleton className="w-full mt-3 h-[50px]" />
      </Container>
    </Body>
  );
};
