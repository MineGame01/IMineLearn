import Image from 'next/image';
import { FC } from 'react';

export const AppLogo: FC<{
  theme: 'light' | 'dark';
  width?: number;
  height?: number;
  className?: string;
}> = ({ theme, width = 170, height = 50, className }) => {
  return (
    <Image
      src={theme === 'dark' ? '/logo-app-dark.png' : '/logo-app-light.png'}
      alt="Logo app"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};
