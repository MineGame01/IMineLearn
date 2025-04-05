import { makeStore } from '@app/model';

export type TStore = ReturnType<typeof makeStore>;
export type TState = ReturnType<TStore['getState']>;
export type TDispatch = TStore['dispatch'];
