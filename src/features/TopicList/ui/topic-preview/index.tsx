import { FC, Fragment } from 'react';
import { ITopic } from '@entities/Topic';
import Image from 'next/image';
import { getServerErrorMessage } from '@shared/model';
import { Body } from './body';
import { Skeleton } from '@shared/ui';
import { userHooksApi } from '@entities/User';

export const TopicPreview: FC<ITopic> = ({ id, user_id, title, views_count }) => {
  const {
    data: user,
    isFetching: isFetchingUser,
    isError: isErrorUser,
    error: errorUser,
  } = userHooksApi.useGetUserQuery({ user_id });

  const errorMessageUser = getServerErrorMessage(errorUser);

  return (
    <Body href={'/topic/' + id}>
      <div className="flex items-center">
        {isErrorUser && <div>{errorMessageUser}</div>}
        {isFetchingUser && <Skeleton />}
        {user && !isFetchingUser && (
          <Fragment>
            <div className="inline-block rounded-full overflow-hidden">
              <Image src="/defaultUser.png" alt={user.username} width="42" height="42" />
            </div>
            <div className="ml-2 font-medium">{user.username}</div>
          </Fragment>
        )}
      </div>
      <div className="ml-5">{title}</div>
      <div className="ml-auto">View: {views_count}</div>
    </Body>
  );
};
