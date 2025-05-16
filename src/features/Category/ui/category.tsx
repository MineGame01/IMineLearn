import { FC } from 'react';
import { ICategory } from '@entities/Category';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { Body } from '@features/Category/ui/body';
import { Container } from '@features/Category/ui/container';
import { CategoryPhotoContainer } from '@features/Category/ui/category-photo-container';
import { ContentContainer } from '@features/Category/ui/content-container';
import { getEnvVar } from '@shared/lib';
import { IServerErrorResponse } from '@shared/model';
import { TitleSecondary } from './title-secondary';
import dynamic from 'next/dynamic';

dayjs.extend(relativeTimePlugin);

const ServerLastTopic = dynamic(
  async () => import('@features/Category/ui/last-topic').then((file) => file.LastTopic),
  {
    loading: () => {
      return <div>Loading...</div>;
    },
  }
);

export const Category: FC<Pick<ICategory, 'id'>> = async ({ id }) => {
  const response = await fetch(
    `${getEnvVar('NEXT_PUBLIC_REST_API_URL')}/category?category_id=${id}`,
    {
      cache: 'no-store',
    }
  );
  const data = (await response.json()) as ICategory | IServerErrorResponse | undefined;

  if (!response.ok) {
    const errorMessage = data ? 'message' in data && data.message : 'Unknown error!';

    return <Body href={'/category/' + id}>{errorMessage || response.statusText}</Body>;
  }

  if (data && !('message' in data)) {
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
  }
};
