import { AuthSlice } from '@widgets/LoginModal';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from '../store/listenerMiddleware.ts';
import { ForumApi } from '@app/api';

const rootReducer = combineReducers({
  [AuthSlice.reducerPath]: AuthSlice.reducer,
  [ForumApi.reducerPath]: ForumApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(ForumApi.middleware);
    },
  });
}
