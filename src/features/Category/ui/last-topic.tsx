import { FC } from 'react';
import Image from 'next/image';
import { ITopic, TTopicId } from '@entities/Topic';
import { IServerErrorResponse } from '@shared/model';
import { appApi } from '@app/api';
import { HTTPError } from 'ky';

interface IProps {
  topic_id: TTopicId;
}

export const LastTopic: FC<IProps> = async ({ topic_id }) => {
  let data: ITopic | null = null;

  try {
    data = await appApi
      .get('topic', { next: { tags: [`refetch-topicid-${topic_id}`] }, searchParams: { topic_id } })
      .json<ITopic>();
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      const messageResponse = (await error.response.json<IServerErrorResponse>()).message;
      return <div>{messageResponse}</div>;
    }
  }

  if (data) {
    return (
      <div className="grow-1 basis-full">
        <div className="flex items-center gap-[13px] mt-[10px]">
          <div className="rounded-full overflow-hidden">
            <Image width="42" height="42" src={'/defaultUser.png'} alt={'User'} />
          </div>
          <div className="font-[600]">{data.title}</div>
        </div>
      </div>
    );
  }
};
