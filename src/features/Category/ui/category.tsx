import { FC, Suspense } from 'react';
import { ICategory, TCategoryId } from '@entities/Category';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { Body } from '@features/Category/ui/body';
import { Container } from '@features/Category/ui/container';
import { CategoryPhotoContainer } from '@features/Category/ui/category-photo-container';
import { ContentContainer } from '@features/Category/ui/content-container';
import { LastTopic } from '@features/Category/ui/last-topic';
import { getEnvVar } from '@shared/lib';

dayjs.extend(relativeTimePlugin);

interface IProps {
  _id: TCategoryId;
}

export const Category: FC<IProps> = async ({ _id }) => {
  const response = await fetch(
    `${getEnvVar('NEXT_PUBLIC_REST_API_URL')}/category?category_id=${_id}`
  );
  const data = (await response.json()) as ICategory | { message: string };

  if (!response.ok) {
    const errorMessage = 'message' in data && data.message;

    return <Body href={'/category/' + _id}>{errorMessage}</Body>;
  }

  if (data && !('message' in data)) {
    const { image_base64_415x, name, lastTopicId, lastActivity, topicsCount } = data;

    const image_src = image_base64_415x ? `data:image/png;base64,${image_base64_415x}` : null;

    return (
      <Body href={'/category/' + _id}>
        <Container>
          <CategoryPhotoContainer categoryName={name} src={image_src} />
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
          <Suspense fallback={<div>Loading...</div>}>
            {lastTopicId && <LastTopic topic_id={lastTopicId} />}
          </Suspense>
        </Container>
      </Body>
    );
  }
};
