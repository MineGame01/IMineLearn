'use client';
import { create } from 'zustand';
import { ResponseError, ResponseUserNotFoundError } from '@shared/model';
import { TAuthUser, TProfile, TUserId } from '@entities/User';
import { userEndpointsApi } from '@entities/User/user/api/user-api-endpoints';

interface IAuthStoreState {
  access_token: string | null;
  user: TAuthUser | null;
  profile: TProfile | null;
}

interface IAuthStoreMethod {
  clearLoginCredentials: () => void;
  setLoginCredentials: (access_token: string, user_id: TUserId) => Promise<void>;
  setAuthUser: (user: Partial<NonNullable<IAuthStoreState['user']>>) => void;
  setAuthUserProfile: (profile: Partial<NonNullable<IAuthStoreState['profile']>>) => void;
}

const initialState: IAuthStoreState = {
  access_token: null,
  user: null,
  profile: null,
};

type TAuthStore = IAuthStoreMethod & IAuthStoreState;

const authStore = create<TAuthStore>((set, get) => ({
  ...initialState,
  clearLoginCredentials() {
    set({ access_token: null, user: null, profile: null });
  },
  async setLoginCredentials(access_token, user_id) {
    try {
      const { profile, ...user } = await userEndpointsApi.getUserAndProfile({ user_id });

      set({ access_token, user, profile });
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
  setAuthUserProfile(profile) {
    const authUserProfile = get().profile;
    if (authUserProfile) {
      set({
        profile: {
          ...authUserProfile,
          ...profile,
        },
      });
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

export const selectAuthUserProfile = (state: TAuthStore) => {
  return state.profile;
};
