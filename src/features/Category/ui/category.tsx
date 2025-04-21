import { FC, Fragment } from 'react';
import { TCategoryId } from '@entities/Category';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { useGetCategoriesQuery } from '@app/api';
import { Body } from '@features/Category/ui/body';
import { Container } from '@features/Category/ui/container';
import { PhotoContainer } from '@features/Category/ui/photo-container';
import { ContentContainer } from '@features/Category/ui/content-container';
import { LastTopic } from '@features/Category/ui/last-topic';
import Image from 'next/image';
import { SkeletonCategory } from './skeleton-category';

dayjs.extend(relativeTimePlugin);

export const Category: FC<{ _id: TCategoryId; isPreview?: boolean }> = ({
  _id,
  isPreview = false,
}) => {
  const { data, isLoading } = useGetCategoriesQuery({ category_id: _id });

  if (isLoading && !isPreview) {
    return <SkeletonCategory />;
  }

  if (data && !Array.isArray(data)) {
    const { image_base64_1200x, image_base64_415x, name, lastTopicId, lastActivity, topicsCount } =
      data;

    const imageSrc =
      image_base64_1200x && image_base64_415x
        ? `data:image/png;base64,${isPreview ? image_base64_1200x : image_base64_415x}`
        : null;

    return (
      <Body href={'/category/' + _id} isPreview={isPreview}>
        <Container>
          <PhotoContainer>
            <div className="absolute left-0 bottom-[50%] transform-[translate(0,50%)] font-[700] text-[1.8rem] ml-[20px]">
              {name}
            </div>
            <Image
              src={imageSrc ?? '/image-not-found.png'}
              alt={name}
              width={1000}
              height={200}
              className="object-contain object-center w-full h-auto"
            />
          </PhotoContainer>
          {!isPreview && (
            <Fragment>
              <ContentContainer>
                <div>
                  <span className="uppercase text-[0.9rem] text-muted">Topics</span>
                  <div className="font-[700] text-[1.5rem]">{topicsCount}</div>
                </div>
                <div>
                  <span className="uppercase text-[0.9rem] text-muted">Last activity</span>
                  <div className="font-[700] text-[1.5rem]">{dayjs(lastActivity).toNow()}</div>
                </div>
              </ContentContainer>
              {lastTopicId && <LastTopic topic_id={lastTopicId} />}
            </Fragment>
          )}
        </Container>
      </Body>
    );
  }
};
