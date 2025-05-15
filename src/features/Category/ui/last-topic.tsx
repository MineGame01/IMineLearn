import { FC } from 'react';
import Image from 'next/image';
import { ITopic, TTopicId } from '@entities/Topic';
import { getEnvVar } from '@shared/lib';
import { IServerErrorResponse } from '@shared/model';

interface IProps {
  topic_id: TTopicId;
}

export const LastTopic: FC<IProps> = async ({ topic_id }) => {
  const response = await fetch(
    `${getEnvVar('NEXT_PUBLIC_REST_API_URL')}/topic?topic_id=${topic_id}`,
    {
      cache: 'no-store',
    }
  );
  const data = (await response.json()) as ITopic | IServerErrorResponse | undefined;

  if (!response.ok) {
    const errorMessage = data ? 'message' in data && data.message : 'Unknown error!';

    return <div>{errorMessage || response.statusText}</div>;
  }

  if (data && !('message' in data)) {
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
