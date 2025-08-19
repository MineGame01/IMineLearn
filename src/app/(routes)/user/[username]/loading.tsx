'use client';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { useGetUserAndProfileQuery } from './_api/use-get-user-and-profile-query';
import { topicsApi } from '@entities/Topic/api/topics-api';
import { useQuery } from '@tanstack/react-query';

const Loading: FC = () => {
  const { username: usernameParam } = useParams();
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;

  const { data: user } = useGetUserAndProfileQuery(username);

  useQuery({
    queryFn: () => topicsApi.getTopics({ user_id: user?.id ?? '' }),
    queryKey: ['topics', user?.id],
    enabled: Boolean(user),
  });

  return <div></div>;
};

export default Loading;
