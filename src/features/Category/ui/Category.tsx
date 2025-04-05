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

dayjs.extend(relativeTimePlugin);

export const Category: FC<{ _id: TCategoryId; isPreview?: boolean }> = ({
  _id,
  isPreview = false,
}) => {
  const { data, isLoading } = useGetCategoriesQuery({ category_id: _id });

  if (isLoading && !isPreview) {
    return <div>Loading...</div>;
  }

  return (
    <Body href={'/category/' + _id} isPreview={isPreview}>
      {data && !Array.isArray(data) && (
        <Container>
          <PhotoContainer>
            <div className="absolute left-0 bottom-[50%] transform-[translate(0,50%)] text-white font-[700] text-[1.5rem] ml-[20px]">
              {data.name}
            </div>
            <Image
              src={'/javascriptCategory.png'}
              alt={data.name}
              width={1000}
              height={200}
              className="object-cover object-center w-full h-[80px]"
            />
          </PhotoContainer>
          {!isPreview && (
            <Fragment>
              <ContentContainer>
                <div>
                  <span className="uppercase text-[0.9rem] text-muted">Topics</span>
                  <div className="font-[700] text-[1.5rem]">{data.topicsCount}</div>
                </div>
                <div>
                  <span className="uppercase text-[0.9rem] text-muted">Last activity</span>
                  <div className="font-[700] text-[1.5rem]">{dayjs(data.lastActivity).toNow()}</div>
                </div>
              </ContentContainer>
              {data.lastTopicId && <LastTopic topic_id={data.lastTopicId} />}
            </Fragment>
          )}
        </Container>
      )}
    </Body>
  );
};
