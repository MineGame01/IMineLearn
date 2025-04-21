import {
  FC,
  Fragment,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  label?: string;
  helperText?: ReactNode;
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
  const [isFocus, setIsFocus] = useState(false);

  const { value, required, onBlur, onFocus } = inputAttr ?? {};

  const isEmpty = !value;

  const defaultStyleLabel =
    'p-[2px] absolute left-[10px] bg-input-bg transform-[translate(0,-50%)]';
  const defaultStyleInput =
    'w-full outline-none focus:border-input-focus border-3 rounded-[10px] px-[9px] py-[10px] bg-input-bg text-text';
  const defaultStyleHelperText = 'text-[0.8rem] ml-2';

  const animationStyle = 'transition-top duration-200 ease-in-out';
  const focusAndNotEmptyStyleLabel = isFocus || !isEmpty ? 'text-[0.8rem] top-0' : 'top-[50%]';
  const focusStyleLabel = isFocus ? 'text-input-focus' : isError ? 'text-error' : 'text-muted';

  const errorStyleInput = isError ? 'border-error' : 'border-input-border';
  const errorStyleHelperText = isError ? 'text-error' : '';

  return (
    <Fragment>
      <div {...containerAttr} className={twMerge('relative', className)}>
        {label && (
          <label
            htmlFor={inputId}
            {...labelAttr}
            className={twMerge(
              `${defaultStyleLabel} ${focusAndNotEmptyStyleLabel} ${animationStyle} ${focusStyleLabel}`,
              classNameLabel
            )}
          >
            {label} {required ? '*' : ''}
          </label>
        )}
        <input
          value={value}
          id={inputId}
          {...inputAttr}
          onBlur={(event) => {
            setIsFocus(false);
            onBlur && onBlur(event);
          }}
          onFocus={(event) => {
            setIsFocus(true);
            onFocus && onFocus(event);
          }}
          className={twMerge(
            `${defaultStyleInput} ${errorStyleInput} ${animationStyle}`,
            classNameInput
          )}
        />
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
