import { AuthReducer } from '@/widgets/LoginModal'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware } from './listenerMiddleware'

const rootReducer = combineReducers({
    auth: AuthReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().prepend(listenerMiddleware.middleware)
    },
})

export type TStore = typeof store
export type TState = ReturnType<TStore['getState']>
export type TDispatch = TStore['dispatch']
