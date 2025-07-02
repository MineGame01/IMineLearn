'use client';
import {
  FC,
  Fragment,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useId,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  label?: string;
  helperText?: ReactNode | string;
  isError?: boolean;
  inputAttr?: InputHTMLAttributes<HTMLInputElement>;
  labelAttr?: LabelHTMLAttributes<HTMLLabelElement>;
  helperTextAttr?: HTMLAttributes<HTMLDivElement>;
  containerAttr?: HTMLAttributes<HTMLDivElement>;
  classNameInput?: string;
  classNameHelperText?: string;
  classNameLabel?: string;
  className?: string;
}

export const Input: FC<IProps> = ({
  label,
  helperText,
  isError,
  inputAttr,
  labelAttr,
  containerAttr,
  helperTextAttr,
  className,
  classNameHelperText,
  classNameInput,
  classNameLabel,
}) => {
  const inputId = useId();

  const { value, required } = inputAttr ?? {};

  const defaultStyleHelperText = 'text-[0.8rem] ml-2';
  const animationStyle = 'transition-top duration-200 ease-in-out';
  const errorStyleHelperText = isError ? 'text-error' : '';

  return (
    <Fragment>
      <div {...containerAttr} className={twMerge('relative', className)}>
        <input
          value={value}
          id={inputId}
          placeholder=" "
          {...inputAttr}
          className={twMerge(
            'peer w-full outline-none focus:border-input-focus border-2 rounded-[10px] px-[9px] text-[0.9rem] py-2 bg-input-bg',
            isError ? 'border-error' : 'border-input-border',
            animationStyle,
            classNameInput
          )}
        />
        {label && (
          <label
            htmlFor={inputId}
            {...labelAttr}
            className={twMerge(
              `p-[2px] absolute left-[10px] bg-input-bg transform-[translate(0,-50%)]`,
              'top-[50%] peer-focus:top-0 peer-focus:text-[0.8rem] not-peer-placeholder-shown:text-[0.8rem] not-peer-placeholder-shown:top-0 peer-focus:text-input-focus',
              isError ? 'text-error' : 'text-muted',
              animationStyle,
              classNameLabel
            )}
          >
            {label} {required ? '*' : ''}
          </label>
        )}
      </div>
      <div
        {...helperTextAttr}
        className={twMerge(
          `${defaultStyleHelperText} ${errorStyleHelperText}`,
          classNameHelperText
        )}
      >
        {helperText}
      </div>
    </Fragment>
  );
};
