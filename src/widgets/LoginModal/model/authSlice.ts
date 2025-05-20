import { authUser, IAuthSliceInitialState, TAuthError } from '@entities/LoginModal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TState } from '@app/model';
import { IAuthUser } from '@entities/User';

const authSliceInitialState: IAuthSliceInitialState = {
  user: { ...authUser },
  isLoading: false,
  error: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: authSliceInitialState,
  reducers: {
    addAuthData(
      state,
      action: PayloadAction<Partial<IAuthUser> & { access_token?: string | null }>
    ) {
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    },
    clearAuthData(state) {
      state.user = authUser;
    },
    setAuthData(state, action: PayloadAction<IAuthUser & { access_token: string | null }>) {
      state.user = action.payload;
    },
    setAuthError(state, action: PayloadAction<TAuthError>) {
      state.error = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addAuthData,
  setAuthError,
  clearAuthError,
  setAuthLoading,
  setAuthData,
  clearAuthData,
} = AuthSlice.actions;

export const selectAuthAccessToken = (state: TState) => {
  return state.auth.user.access_token;
};

export const selectAuthIsLoading = (state: TState) => {
  return state.auth.isLoading;
};

export const selectAuthError = (state: TState) => {
  return state.auth.error;
};

export const selectAuthUserInfo = (state: TState) => state.auth.user;
