'use client';
import { FC } from 'react';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { TitleSecondary } from './title-secondary';

dayjs.extend(relativeTimePlugin);

export const LastActivity: FC<{ timestamp: number | null }> = ({ timestamp }) => {
  return (
    <div>
      <TitleSecondary>Last activity</TitleSecondary>
      <div className="font-[700] text-[1.5rem]">{dayjs(timestamp).toNow()}</div>
    </div>
  );
};
