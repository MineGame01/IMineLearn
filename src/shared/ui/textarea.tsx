import { FC, Fragment, HTMLAttributes, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
  helperText?: string;
  helperTextAttr?: HTMLAttributes<HTMLDivElement>;
  classNameHelperText?: string;
}

export const Textarea: FC<IProps> = ({
  className,
  isError,
  helperText,
  classNameHelperText,
  helperTextAttr,
  ...props
}) => {
  const defaultStyleTextarea =
    'w-full outline-none focus:border-input-focus border-[1.5px] rounded-[10px] px-[9px] text-[0.9rem] py-2 bg-input-bg';
  const animationStyle = 'transition-top duration-200 ease-in-out';
  const defaultStyleHelperText = 'text-[0.8rem] ml-2';

  const errorStyleTextarea = isError ? 'border-error' : 'border-input-border';
  const errorStyleHelperText = isError ? 'text-error' : '';

  return (
    <Fragment>
      <textarea
        {...props}
        className={twMerge(
          `${defaultStyleTextarea}, ${animationStyle} ${errorStyleTextarea}`,
          className
        )}
      />
      <div
        {...helperTextAttr}
        className={twMerge(
          `${defaultStyleHelperText} ${errorStyleHelperText} `,
          classNameHelperText
        )}
      >
        {helperText}
      </div>
    </Fragment>
  );
};
