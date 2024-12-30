import { IAuthSliceInitialState } from '@/entities/LoginModal'
import { createSlice } from '@reduxjs/toolkit'
import { signUpNewUserThunk } from '../api/signUpNewUserThunk'

const initialState: IAuthSliceInitialState = {
    id: null,
    username: null,
    bio: null,
    email: null,
    isAdmin: false,
    createAt: null,
    isLoading: false,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpNewUserThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUpNewUserThunk.fulfilled, (_unused, action) => {
                const data = action.payload
                console.log(data)
            })
    },
})

export const AuthReducer = AuthSlice.reducer
