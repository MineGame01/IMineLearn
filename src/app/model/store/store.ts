import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ForumApi } from '@app/api';

const rootReducer = combineReducers({
  [ForumApi.reducerPath]: ForumApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(ForumApi.middleware);
    },
  });
};
