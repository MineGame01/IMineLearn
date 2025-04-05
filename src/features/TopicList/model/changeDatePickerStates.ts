import dayjs, { Dayjs } from 'dayjs';
import { IDatePickerValues, TDatePickerState } from '@features/TopicList/model/TDatePickerState.ts';
import { Dispatch } from 'react';

export const changeDatePickerStates = (
  setDatePickerState: Dispatch<TDatePickerState>,
  datePickerState: TDatePickerState
) => {
  return (value: Dayjs | null, option: keyof IDatePickerValues) => {
    if (value) {
      const timeStamp = value.valueOf();
      setDatePickerState({
        ...datePickerState,
        createdAtBefore: option === 'createdAtBefore' ? timeStamp : datePickerState.createdAtBefore,
        createdAtAfter:
          option === 'createdAtBefore'
            ? dayjs(datePickerState.createdAtAfter).diff() >= value.diff()
              ? timeStamp
              : datePickerState.createdAtAfter
            : timeStamp,
      });
    }
  };
};
