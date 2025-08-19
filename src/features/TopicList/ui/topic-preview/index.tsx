import { FC, Fragment } from 'react';
import { ITopic } from '@entities/Topic';
import Image from 'next/image';
import { Body } from './body';
import { Skeleton } from '@shared/ui';
import { userHooksApi } from '@entities/User';

export const TopicPreview: FC<ITopic> = ({ id, user_id, title, views_count }) => {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = userHooksApi.useGetUserQuery({ user_id });

  return (
    <Body href={'/topic/' + id}>
      <div className="flex items-center overflow-hidden">
        <div className="flex items-center">
          {isErrorUser && <div>{errorUser.message}</div>}
          {isLoadingUser && (
            <div className="flex gap-2 items-center">
              <Skeleton className="bg-background rounded-full w-[42px] h-[42px]" />
              <Skeleton className="bg-background" />
            </div>
          )}
          {user && (
            <Fragment>
              <div className="rounded-full min-w-[42px] overflow-hidden">
                <Image src="/defaultUser.png" alt={user.username} width="42" height="42" />
              </div>
              <div className="ml-2 font-medium">{user.username}</div>
            </Fragment>
          )}
        </div>
        <div className="ml-5 text-nowrap">{title}</div>
      </div>
      <div className="ml-auto text-nowrap">View: {views_count}</div>
    </Body>
  );
};
