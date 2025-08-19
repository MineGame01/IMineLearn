import { FC } from 'react';
import { ITopic } from '@entities/Topic';
import { TopicPreview } from './topic-preview';
import { twMerge } from 'tailwind-merge';

export const List: FC<{ topics: ITopic[]; className?: string }> = ({ topics, className }) => {
  return (
    <div className={twMerge('flex flex-col px-1 lg:px-0 gap-y-3', className)}>
      {topics.map((topic) => (
        <TopicPreview key={topic.id} {...topic} />
      ))}
    </div>
  );
};
