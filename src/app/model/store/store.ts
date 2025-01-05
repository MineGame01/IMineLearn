import { AuthReducer } from '@/widgets/LoginModal'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware } from './listenerMiddleware.ts'
import { ForumApi } from '@/app/api'

const rootReducer = combineReducers({
    auth: AuthReducer,
    [ForumApi.reducerPath]: ForumApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(ForumApi.middleware)
    },
})
