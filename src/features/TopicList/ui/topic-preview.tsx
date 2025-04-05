'use client';
import { FC, Fragment } from 'react';
import { ITopic } from '@entities/Topic';
import Image from 'next/image';
import Link from 'next/link';
import { useGetUserQuery } from '@app/api';
import { getServerErrorMessage } from '@shared/model';

export const TopicPreview: FC<ITopic> = ({ _id, user_id, title, views_count }) => {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUserQuery({ user_id });

  const errorMessageUser = getServerErrorMessage(errorUser);

  return (
    <Link
      href={'/topic/' + _id}
      className="bg-surface border-border border-2 flex items-center p-3 transform-box-shadow duration-100 ease-in-out hover:shadow-2xl rounded-border-default"
    >
      <div className="flex items-center">
        {isErrorUser && <div>{errorMessageUser}</div>}
        {isLoadingUser && <div>Loading...</div>}
        {user && !isLoadingUser && (
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
    </Link>
  );
};
