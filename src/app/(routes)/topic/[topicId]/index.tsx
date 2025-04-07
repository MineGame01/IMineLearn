import { FC } from 'react';
import { Topic } from '@features/Topic';
import { useParams } from 'next/navigation';

export const TopicPage: FC = () => {
  const { topicId } = useParams();
  return (
    <main>
      <div className="container mx-auto">
        {typeof topicId === 'string' && <Topic topic_id={topicId} />}
      </div>
    </main>
  );
};
