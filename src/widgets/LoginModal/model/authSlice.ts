import {
    authUser,
    IAuthSliceInitialState,
    TAuthAccessToken,
    TAuthError,
} from '@/entities/LoginModal'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TState } from '@/app/model'

const authSliceInitialState: IAuthSliceInitialState = {
    ...authUser,
    isLoading: false,
    error: null,
    accessToken: null,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: authSliceInitialState,
    reducers: {
        setAuthData: (
            state,
            action: PayloadAction<
                NonNullable<
                    Pick<
                        IAuthSliceInitialState,
                        'id' | 'username' | 'bio' | 'email' | 'isAdmin' | 'createAt' | 'accessToken'
                    >
                >
            >,
        ) => {
            const data = action.payload

            return {
                ...state,
                ...data,
            }
        },
        setAuthError(state, action: PayloadAction<TAuthError>) {
            state.error = action.payload
        },
        clearAuthError(state) {
            state.error = null
        },
        setAuthLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        updateAccessToken(state, action: PayloadAction<TAuthAccessToken>) {
            state.accessToken = action.payload
        },
    },
})

export const AuthReducer = AuthSlice.reducer

export const { updateAccessToken, setAuthData, setAuthError, clearAuthError, setAuthLoading } =
    AuthSlice.actions

export const selectAuthAccessToken = (state: TState) => {
    return state.auth.accessToken
}

export const selectAuthUserId = (state: TState) => {
    return state.auth.id
}

export const selectAuthLoading = (state: TState) => {
    return state.auth.isLoading
}

export const selectAuthError = (state: TState) => {
    return state.auth.error
}

export const selectAuthUserInfo = createSelector(
    [(state: TState) => state.auth, selectAuthUserId],
    (auth, id) => {
        const { isAdmin, username, bio, email, createAt } = auth

        return { id, isAdmin, username, bio, email, createAt }
    },
)
