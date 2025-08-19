'use client';
import { topicsApi } from '@entities/Topic/api/topics-api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FC } from 'react';

const Loading: FC = () => {
  const { topicId } = useParams();
  const topic_id = Array.isArray(topicId) ? topicId[0] : topicId;

  useQuery({
    queryFn: () => topicsApi.getTopicByIdAndComments({ topic_id: topic_id ?? ' ' }),
    queryKey: ['topic', 'topic-comments', topic_id],
    enabled: Boolean(topic_id),
  });

  return <div></div>;
};

export default Loading;
