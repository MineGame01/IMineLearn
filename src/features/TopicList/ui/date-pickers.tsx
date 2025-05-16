import { Dispatch, FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {
  IDatePickerSettings,
  TDatePickerState,
} from '@features/TopicList/model/TDatePickerState.ts';
import { changeDatePickerStates } from '@features/TopicList/model/changeDatePickerStates.ts';

export const DatePickers: FC<{
  datePickerState: TDatePickerState;
  setDatePickerState: Dispatch<TDatePickerState>;
  changeDatePickerState: ReturnType<typeof changeDatePickerStates>;
}> = ({ datePickerState, setDatePickerState, changeDatePickerState }) => {
  const changeSettingDatePicker = (value: boolean, option: keyof IDatePickerSettings) => {
    setDatePickerState({
      ...datePickerState,
      [option]: value,
    });
  };

  return (
    <div className="mt-2 flex gap-[10px]">
      <DatePicker
        open={datePickerState.isOpenModalCreatedAtAfter}
        onOpen={() => {
          changeSettingDatePicker(true, 'isOpenModalCreatedAtAfter');
        }}
        onClose={() => {
          changeSettingDatePicker(false, 'isOpenModalCreatedAtAfter');
        }}
        label={'Created after'}
        value={dayjs(datePickerState.createdAtAfter)}
        maxDate={dayjs().set('date', dayjs().date() - 1)}
        onAccept={(value) => {
          changeDatePickerState(value, 'createdAtAfter');
        }}
      />
      <hr />
      <DatePicker
        open={datePickerState.isOpenModalCreatedAtBefore}
        onOpen={() => {
          changeSettingDatePicker(true, 'isOpenModalCreatedAtBefore');
        }}
        onClose={() => {
          changeSettingDatePicker(false, 'isOpenModalCreatedAtBefore');
        }}
        label={'Created before'}
        value={dayjs(datePickerState.createdAtBefore)}
        maxDate={dayjs()}
        onAccept={(value) => {
          changeDatePickerState(value, 'createdAtBefore');
        }}
      />
    </div>
  );
};
