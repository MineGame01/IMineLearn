'use client';
import { FC } from 'react';
import { Topic } from '@features/Topic';
import { useParams } from 'next/navigation';

const TopicPage: FC = () => {
  const { topicId } = useParams();
  return (
    <main className="grow-1 container mx-auto bg-surface p-2">
      {typeof topicId === 'string' && <Topic topic_id={topicId} />}
    </main>
  );
};

export default TopicPage;
