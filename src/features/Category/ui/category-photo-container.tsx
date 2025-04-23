import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  categoryNameElAttr?: HTMLAttributes<HTMLDivElement>;
  classNameCategoryNameEl?: string;
  classNameImage?: string;
  categoryName: string;
  src: string | null;
}

export const CategoryPhotoContainer: FC<IProps> = ({
  children,
  className,
  categoryName,
  categoryNameElAttr,
  classNameImage,
  classNameCategoryNameEl,
  src,
  ...props
}) => {
  const defaultContainerStyle =
    'flex justify-center h-[80px] grow-1 overflow-hidden rounded-border-default relative';
  const defaultNameStyle =
    'absolute left-0 bottom-[50%] transform-[translate(0,50%)] font-[700] text-[1.8rem] ml-[20px]';
  const defaultImageStyle = 'object-contain object-center w-full h-auto';

  return (
    <div {...props} className={twMerge(defaultContainerStyle, className)}>
      <div className={twMerge(defaultNameStyle, classNameCategoryNameEl)}>{categoryName}</div>
      <Image
        src={src ?? '/image-not-found.png'}
        alt={categoryName}
        width={1000}
        height={200}
        className={twMerge(defaultImageStyle, classNameImage)}
      />
    </div>
  );
};
