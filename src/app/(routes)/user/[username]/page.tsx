'use client';
import { ITopic } from '@entities/Topic';
import { TopicPreviewSkeleton, TopicPreview } from '@features/TopicList';
import { getServerErrorMessage } from '@shared/model';
import { Paper, Skeleton } from '@shared/ui';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Fragment, useMemo } from 'react';
import { AboutProfile } from './_ui/about-profile';
import { UserNotFoundError } from './_model/user-not-found-error';
import { FailedLoadingUserTopicsError } from './_model/failed-loading-user-topics-error';
import { useMutationState, useQuery } from '@tanstack/react-query';
import { topicsApi } from '@entities/Topic/api/topics-api';
import { selectAuthUser, selectAuthUserProfile, useAuthStore } from '@entities/auth';
import { userHooksApi } from '@entities/User';

const UserPage = () => {
  const { username: username_param } = useParams();

  const username = username_param?.toString();

  const authUser = useAuthStore(selectAuthUser);
  const authUserProfile = useAuthStore(selectAuthUserProfile);

  const isAuthUser = username === authUser?.username;

  const refreshTokenStatus = useMutationState({
    filters: { mutationKey: ['refreshToken'] },
    select(mutate) {
      return mutate.state;
    },
  }).at(-1)?.status;

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = userHooksApi.useGetUserAndProfileQuery(
    {
      username,
    },
    {
      enabled: refreshTokenStatus !== 'pending' || !isAuthUser,
      initialData:
        authUser && authUserProfile && isAuthUser
          ? {
              id: authUser.id,
              username: authUser.username,
              email: authUser.email,
              created_at: authUser.created_at,
              profile: authUserProfile,
            }
          : undefined,
    }
  );

  const {
    data: userTopics,
    isLoading: isLoadingUserTopics,
    isError: isErrorUserTopics,
    error: errorUserTopics,
  } = useQuery({
    queryFn: () => topicsApi.getTopics({ user_id: user?.id ?? '' }),
    queryKey: ['topics', user?.id],
    enabled: Boolean(user),
  });

  const errorUserMessage = getServerErrorMessage(errorUser);

  const topicPreviewSkeletons = useMemo(() => {
    return Array(7)
      .fill(TopicPreviewSkeleton)
      .map((TopicPreviewSkeleton, index) => <TopicPreviewSkeleton key={index} />);
  }, []);

  if (isErrorUser) {
    throw new UserNotFoundError(errorUserMessage);
  }

  if (isErrorUserTopics) {
    throw new FailedLoadingUserTopicsError(errorUserTopics.message);
  }

  return (
    <div className="container mx-auto flex flex-wrap gap-5 m-5 px-1 lg:px-0">
      <Paper className="grow-1 p-2 max-w-full h-auto lg:max-w-[200px]">
        <div className="flex lg:block gap-x-2">
          {isLoadingUser && (
            <Fragment>
              <Skeleton className="bg-background lg:w-full w-[180px] h-[200px]" />
              <div className="flex flex-col grow-1">
                <Skeleton className="bg-background mt-2 w-[80px]" />
                <Skeleton className="bg-background mt-2 w-full lg:w-[170px] h-[100px]" />
              </div>
            </Fragment>
          )}
          {!isLoadingUser && (
            <Fragment>
              <Image
                src="/defaultUser.png"
                className="w-[150px] h-auto lg:w-[200px]"
                alt={user?.username ?? ''}
                width={200}
                height={200}
                priority
              />
              {user && (
                <AboutProfile
                  id={user.id}
                  is_admin={user.profile.is_admin}
                  bio={user.profile.bio}
                  username={user.username}
                />
              )}
            </Fragment>
          )}
        </div>
      </Paper>
      <div className="grow-5 basis-full lg:basis-auto">
        <h1 className="text-2xl font-bold">{isAuthUser ? 'Yours' : user?.username} Topics</h1>
        <div className="mt-3 flex flex-col gap-y-2">
          {isLoadingUserTopics && topicPreviewSkeletons}
          {!isLoadingUserTopics &&
            userTopics?.map((data) => {
              const topic = data as ITopic;
              return <TopicPreview key={topic.id} {...topic} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
