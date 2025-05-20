'use client';
import { useGetTopicsQuery, useGetUserQuery, useUpdateUserMutation } from '@app/api';
import { useAppSelector } from '@app/lib';
import { ITopic } from '@entities/Topic';
import { TopicPreviewSkeleton, TopicPreview } from '@features/TopicList';
import { getServerErrorMessage } from '@shared/model';
import { Paper, Skeleton } from '@shared/ui';
import { selectAuthUserInfo } from '@widgets/LoginModal';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Fragment, useMemo } from 'react';
import { AboutProfile } from './_ui/about-profile';
import { UserNotFoundError } from './_model/user-not-found-error';
import { FailedLoadingUserTopicsError } from './_model/failed-loading-user-topics-error';

const UserPage = () => {
  const { username: username_param } = useParams();

  const username = username_param?.toString();

  const auth_user = useAppSelector(selectAuthUserInfo);

  const is_auth_user = username === auth_user.username;

  const { isLoading: isLoadingUpdateUser } = useUpdateUserMutation()[1];

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUserQuery({ username: username ?? '' }, { skip: isLoadingUpdateUser || is_auth_user });

  const current_user = is_auth_user ? auth_user : user;

  const {
    data: userTopics,
    isLoading: isLoadingUserTopics,
    isError: isErrorUserTopics,
    error: errorUserTopics,
  } = useGetTopicsQuery({ user_id: current_user?.id ?? '' }, { skip: !current_user });

  const errorUserMessage = getServerErrorMessage(errorUser),
    errorUserTopicsMessage = getServerErrorMessage(errorUserTopics);

  const topicPreviewSkeletons = useMemo(() => {
    return Array(7)
      .fill(TopicPreviewSkeleton)
      .map((TopicPreviewSkeleton, index) => <TopicPreviewSkeleton key={index} />);
  }, []);

  if (isErrorUser) {
    throw new UserNotFoundError(errorUserMessage);
  }

  if (isErrorUserTopics) {
    throw new FailedLoadingUserTopicsError(errorUserTopicsMessage);
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
                alt={current_user?.username ?? 'Loading...'}
                width={200}
                height={200}
                priority
              />
              {current_user && <AboutProfile {...current_user} />}
            </Fragment>
          )}
        </div>
      </Paper>
      <div className="grow-5 basis-full lg:basis-auto">
        <h1 className="text-2xl font-bold">{current_user?.username} Topics</h1>
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
