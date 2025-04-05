import { FC } from 'react';
import Image from "next/image"
import { TTopicId } from '@entities/Topic';
import { useGetTopicByIdQuery } from '@app/api';

interface IProps {
    topic_id: TTopicId
}

export const LastTopic: FC<IProps> = ({ topic_id }) => {
  const {data, isLoading, isError} = useGetTopicByIdQuery(topic_id)

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data) {
    return (
      <div className='grow-1 basis-full'>
        <span className="uppercase text-[0.9rem] text-muted">Last Topic</span>
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
