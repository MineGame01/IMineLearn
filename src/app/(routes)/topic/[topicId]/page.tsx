'use client';
import { FC } from 'react';
import { Topic } from '@features/Topic';
import { useParams } from 'next/navigation';

const TopicPage: FC = () => {
  const { topicId } = useParams();
  return (
    <main>
      <div className="container mx-auto px-2">
        {typeof topicId === 'string' && <Topic topic_id={topicId} />}
      </div>
    </main>
  );
};

export default TopicPage;
