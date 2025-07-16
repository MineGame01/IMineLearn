'use client';
import { FC } from 'react';
import * as m from 'motion/react-client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@shared/ui';

const NotFoundPage: FC = () => {
  const router = useRouter();

  const handleClickToHome = () => {
    router.push('/');
  };

  return (
    <main>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container px-5 mx-auto h-[100vh]"
      >
        <Image src={'/404.png'} alt={'404'} width={500} height={100} className="h-auto mx-auto" />
        <div>
          <div className="text-[4rem] font-bold">Oh No! Error 404</div>
          <div className="text-[1.5rem] mt-[15px]">Come back to the homepage</div>
          <Button onClick={handleClickToHome} variant={'contained'} className="mt-3">
            Back to Homepage
          </Button>
        </div>
      </m.div>
    </main>
  );
};

export default NotFoundPage;
