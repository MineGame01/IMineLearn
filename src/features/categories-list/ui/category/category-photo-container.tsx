'use client';
import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  categoryNameAttr?: HTMLAttributes<HTMLDivElement>;
  classNameCategoryName?: string;
  classNameImage?: string;
  categoryName: string;
  src: string | null;
}

export const CategoryPhotoContainer: FC<IProps> = ({
  className,
  categoryName,
  categoryNameAttr,
  classNameImage,
  classNameCategoryName,
  src,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        'flex items-center h-[80px] grow-1 justify-start overflow-hidden',
        className
      )}
    >
      <Image
        src={src ?? '/image-not-found.png'}
        alt={categoryName}
        width={1000}
        height={200}
        priority
        className={twMerge(
          'object-contain w-auto max-w-[250px] object-center h-full rounded-default-radius',
          classNameImage
        )}
      />
      <div
        className={twMerge('font-[700] text-[1.8rem] ml-[20px]', classNameCategoryName)}
        {...categoryNameAttr}
      >
        {categoryName}
      </div>
    </div>
  );
};
