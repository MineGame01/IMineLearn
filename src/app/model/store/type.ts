import { store } from '@/app/model'

export type TStore = typeof store
export type TState = ReturnType<TStore['getState']>
export type TDispatch = TStore['dispatch']
