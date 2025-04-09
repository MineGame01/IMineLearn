import { FC } from 'react';
import { ITopic } from '@entities/Topic';
import { TopicPreview } from './topic-preview';

export const List: FC<{ topics: ITopic[] }> = ({ topics }) => {
  return (
    <div className="flex flex-col gap-y-3">
      {topics.map((topic) => (
        <TopicPreview key={topic._id} {...topic} />
      ))}
    </div>
  );
};
