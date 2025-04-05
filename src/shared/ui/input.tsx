import { FC, Fragment, InputHTMLAttributes, ReactNode, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label?: string;
  helperText?: ReactNode;
  isError?: boolean;
}

export const Input: FC<IProps> = ({
  label,
  helperText,
  className,
  value,
  onBlur,
  onFocus,
  isError,
  required,
  ...props
}) => {
  const inputId = useId();
  const [isFocus, setIsFocus] = useState(false);

  const isEmpty = value.length === 0;

  const animation = 'transition-top duration-200 ease-in-out';

  return (
    <Fragment>
      <div className="relative">
        {label && (
          <label
            className={`p-[2px] ${isFocus || !isEmpty ? 'text-[0.8rem]' : ''} ${animation} ${isFocus ? 'text-input-focus' : isError ? 'text-error' : 'text-muted'} absolute ${isFocus || !isEmpty ? 'top-0' : 'top-[50%]'} left-[10px] bg-input-bg transform-[translate(0,-50%)]`}
            htmlFor={inputId}
          >
            {label} {required ? '*' : ''}
          </label>
        )}
        <input
          value={value}
          onBlur={(event) => {
            setIsFocus(false);
            if (onBlur) {
              onBlur(event);
            }
          }}
          onFocus={(event) => {
            setIsFocus(true);
            if (onFocus) {
              onFocus(event);
            }
          }}
          className={twMerge(
            `w-full ${animation} outline-none ${isError ? 'border-error' : 'border-input-border'} focus:border-input-focus border-3 rounded-[10px] px-[9px] py-[10px] bg-input-bg text-text`,
            className
          )}
          id={inputId}
          required={required}
          {...props}
        />
      </div>
      <div className={`text-[0.8rem] ml-2 ${isError ? 'text-error' : ''}`}>{helperText}</div>
    </Fragment>
  );
};
