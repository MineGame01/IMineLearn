import { FC } from 'react';
import { ICategory } from '@entities/categories-list';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { Body } from './body';
import { Container } from './container';
import { CategoryPhotoContainer } from './category-photo-container';
import { ContentContainer } from './content-container';
import { ResponseError } from '@shared/model';
import { TitleSecondary } from './title-secondary';
import dynamic from 'next/dynamic';
import { categoriesApi } from '@entities/categories-list/api/categories-api';

dayjs.extend(relativeTimePlugin);

const ServerLastTopic = dynamic(async () => import('./last-topic').then((file) => file.LastTopic), {
  loading: () => {
    return <div>Loading...</div>;
  },
});

export const Category: FC<Pick<ICategory, 'id'>> = async ({ id }) => {
  try {
    const data = await categoriesApi.getCategoryById(id);

    const { image_base64_415x, name, lastTopicId, lastActivity, topicsCount } = data;

    const image_src = image_base64_415x ? `data:image/png;base64,${image_base64_415x}` : null;

    return (
      <Body href={'/category/' + id}>
        <Container>
          <CategoryPhotoContainer categoryName={name} src={image_src} />
          <ContentContainer>
            <div>
              <TitleSecondary>Topics</TitleSecondary>
              <div className="font-[700] text-[1.5rem]">{topicsCount}</div>
            </div>
            <div>
              <TitleSecondary>Last activity</TitleSecondary>
              <div className="font-[700] text-[1.5rem]">{dayjs(lastActivity).toNow()}</div>
            </div>
          </ContentContainer>
          <TitleSecondary className="w-full">Last Topic</TitleSecondary>
          {lastTopicId && <ServerLastTopic topic_id={lastTopicId} />}
          {!lastTopicId && (
            <div className="flex items-center">
              <div className="font-[600]">Latest topic not found</div>
            </div>
          )}
        </Container>
      </Body>
    );
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      return <div>{error.message}</div>;
    } else {
      throw error;
    }
  }
};
