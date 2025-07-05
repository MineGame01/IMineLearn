'use client';
import { create } from 'zustand';
import { ResponseError, ResponseUserNotFoundError } from '@shared/model';
import { IAuthUser, TUserId } from '@entities/User';
import { appApi } from '@app/api';

interface IAuthStoreState {
  access_token: string | null;
  user: IAuthUser | null;
}

interface IAuthStoreMethod {
  clearLoginCredentials: () => void;
  setLoginCredentials: (access_token: string, user_id: TUserId) => Promise<void>;
  setAuthUser: (user: Partial<NonNullable<IAuthStoreState['user']>>) => void;
}

const initialState: IAuthStoreState = {
  access_token: null,
  user: null,
};

type TAuthStore = IAuthStoreMethod & IAuthStoreState;

const authStore = create<TAuthStore>((set, get) => ({
  ...initialState,
  clearLoginCredentials() {
    set({ access_token: null, user: null });
  },
  async setLoginCredentials(access_token, user_id) {
    try {
      const user = await appApi
        .get('user', { searchParams: { user_id } })
        .then((res) => res.json<IAuthUser>());
      set({ access_token, user });
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        if (error.code === new ResponseUserNotFoundError().code) {
          get().clearLoginCredentials();
        }
      } else {
        throw error;
      }
    }
  },
  setAuthUser(user) {
    const authUser = get().user;
    if (authUser) {
      set({
        user: {
          ...authUser,
          ...user,
        },
      });
    }
  },
}));

export { authStore, authStore as useAuthStore };

export const selectAuthUser = (state: TAuthStore) => {
  return state.user;
};

export const selectAccessToken = (state: TAuthStore) => {
  return state.access_token;
};
