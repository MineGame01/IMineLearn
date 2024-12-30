import { AuthReducer } from '@/widgets/LoginModal'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    auth: AuthReducer,
})

export const store = configureStore({
    reducer: {
        root: rootReducer,
    },
})
