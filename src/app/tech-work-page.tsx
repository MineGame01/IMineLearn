import Image from 'next/image';
import { FC } from 'react';

export const TechWorkPage: FC = () => {
  return (
    <main className="container mx-auto h-dvh flex flex-col items-center justify-center">
      <div>
        <Image
          src="/gear-loading-dark_200x200.png"
          alt="Gear Loading Png"
          width={200}
          height={200}
          unoptimized
          priority
        />
      </div>
      <h1 className="font-bold mt-5 text-3xl">Sorry, technical work is in progress...</h1>
      <span>The status of the work is updated every 5 minutes.</span>
    </main>
  );
};
