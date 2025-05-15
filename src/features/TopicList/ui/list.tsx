import { FC } from 'react';
import { ITopic } from '@entities/Topic';
import { TopicPreview } from './topic-preview';

export const List: FC<{ topics: ITopic[] }> = ({ topics }) => {
  return (
    <div className="flex flex-col px-1 lg:px-0 gap-y-3">
      {topics.map((topic) => (
        <TopicPreview key={topic.id} {...topic} />
      ))}
    </div>
  );
};
