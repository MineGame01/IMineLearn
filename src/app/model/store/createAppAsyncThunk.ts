import { createAsyncThunk } from '@reduxjs/toolkit'
import { TDispatch, TState } from '../../../entities/Store/model/types.type'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: TState
    dispatch: TDispatch
}>()
