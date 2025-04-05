import { createAsyncThunk } from '@reduxjs/toolkit';
import { TDispatch, TState } from '@app/model';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: TState;
  dispatch: TDispatch;
}>();
