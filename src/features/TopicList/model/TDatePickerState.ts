export interface IDatePickerValues {
  createdAtBefore: number | null;
  createdAtAfter: number | null;
}

export interface IDatePickerSettings {
  isOpenModalCreatedAtBefore: boolean;
  isOpenModalCreatedAtAfter: boolean;
}

export type TDatePickerState = IDatePickerValues & IDatePickerSettings;
