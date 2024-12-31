import { supabaseClient } from '@/app/api'
import { TStartAppListening } from '@/app/model'
import { authUser, TAuthUserEmail } from '@/entities/LoginModal'
import { ForumAPI } from '@/shared/api'
import { createAction } from '@reduxjs/toolkit'
import { AuthError, Session, User } from '@supabase/supabase-js'
import { clearAuthError, selectAuthAccessToken, setAuthData, setAuthError, setAuthLoading } from './authSlice'

export const authLogin = createAction(
    'auth/authLogin',
    (
        email: NonNullable<TAuthUserEmail> | null,
        password: string | null,
        typeAuth: 'login' | 'registration' | 'checkSession',
    ) => {
        return {
            payload: {
                email,
                password,
                typeAuth,
            },
        }
    },
)

export const authListener = (startAppListening: TStartAppListening) => {
    const TIMEOUT_CLEAR_ERROR = 10000;

    startAppListening({
        actionCreator: authLogin,
        effect: async (action, listenerApi) => {
            const { email, password, typeAuth } = action.payload
            const state = listenerApi.getState()
            const authAccessToken = selectAuthAccessToken(state)

            const { dispatch } = listenerApi

            const setError = (error: string) => {
                dispatch(setAuthError(error))

                setTimeout(() => {
                    dispatch(clearAuthError())
                }, TIMEOUT_CLEAR_ERROR)
            }

            const getData = async (
                userData: User | null,
                sessionData: Session | null,
                authError: AuthError | null,
            ) => {
                const data = authUser

                if (userData && sessionData) {
                    const accessToken = sessionData.access_token
                    const { id, email } = userData

                    data.accessToken = accessToken
                    data.id = id
                    data.email = email ?? null

                    dispatch(setAuthLoading(true))

                    const userInfo = await ForumAPI.getUserInfo({ user_id: id }, authAccessToken)

                    if (userInfo[0]) {
                        const { username, bio, created_at, is_admin } = userInfo[0]

                        data.bio = bio
                        data.username = username
                        data.createAt = created_at
                        data.isAdmin = is_admin
                    }
                }

                dispatch(setAuthData(data))
                if (authError) {
                    setError(authError.message)
                }
                dispatch(setAuthLoading(false))
            }

            switch (typeAuth) {
                case 'login': {
                    if (email && password && !authAccessToken) {
                        dispatch(setAuthLoading(true))
                        const { data: authData, error: authError } =
                            await supabaseClient.auth.signInWithPassword({
                                email,
                                password,
                            })

                        const userData = authData.user
                        const sessionData = authData.session

                        dispatch(setAuthLoading(false))
                        await getData(userData, sessionData, authError)
                    }
                    return
                }
                case 'registration': {
                    if (email && password && !authAccessToken) {
                        const { data: registrationData, error: registrationError } =
                            await supabaseClient.auth.signUp({
                                email,
                                password,
                            })

                        const userData = registrationData.user
                        const sessionData = registrationData.session

                        await getData(userData, sessionData, registrationError)
                    }

                    return
                }
                case 'checkSession': {
                    if (!authAccessToken) {
                        const { data: authData, error: authError } =
                            await supabaseClient.auth.getSession()

                        const sessionData = authData.session

                        if (sessionData) {
                            const userData = sessionData.user

                            getData(userData, sessionData, authError)
                        }
                    }

                    return
                }
            }
        }
    })
}
