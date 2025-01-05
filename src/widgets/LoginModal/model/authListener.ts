import { ForumApi, supabaseClient } from '@/app/api'
import { TStartAppListening } from '@/app/model'
import { authUser, TAuthUserEmail } from '@/entities/LoginModal'
import { createAction } from '@reduxjs/toolkit'
import { AuthError, AuthResponse, GoTrueClient, Session, User } from '@supabase/supabase-js'
import {
    clearAuthError,
    selectAuthAccessToken,
    setAuthData,
    setAuthError,
    setAuthLoading,
} from './authSlice'

/**
 * An action creator that is used to perform authorization, registration, and checking of the current session.
 *
 * @param email New user email
 * @param password User password
 * @param typeAuth Authorization type
 */
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

/**
 * An "authLogin" action listener that performs all the necessary actions for authorization, registration, and session verification.
 */
export const authListener = (startAppListening: TStartAppListening) => {
    // Time after which the error will be removed
    const TIMEOUT_CLEAR_ERROR = 10000

    startAppListening({
        actionCreator: authLogin,
        effect: async (action, { dispatch, getState }) => {
            const { email, password, typeAuth } = action.payload

            const state = getState()

            const authAccessToken = selectAuthAccessToken(state)

            /**
             * Used to set the error to state
             *
             * Also sets a countdown after which the installed error will be removed.
             *
             * @param error Error line
             * */
            const setError = (error: string) => {
                dispatch(setAuthError(error))

                setTimeout(() => {
                    dispatch(clearAuthError())
                }, TIMEOUT_CLEAR_ERROR)
            }

            /**
             * Function to get information about the user after logging into the session
             *
             * After collecting the information, dispatches the action to the authReducer
             *
             * @param userData User information after logging into a session
             * @param sessionData Received Session Information
             * @param authError Error object if a problem occurred during the session
             * */
            const getUserData = async (
                userData: User | null | undefined,
                sessionData: Session | null | undefined,
                authError: AuthError | null | undefined,
            ) => {
                /**
                 * An object with all the information about the user
                 *
                 * Used for temporary storage of received information
                 * */
                const data = {
                    ...authUser,
                }

                if (userData && sessionData) {
                    const accessToken = sessionData.access_token
                    const { id, email } = userData

                    data.accessToken = accessToken
                    data.id = id
                    data.email = email ?? null

                    dispatch(setAuthLoading(true))

                    const userInfo = await dispatch(
                        ForumApi.endpoints.getUserInfo.initiate({ user_id: id }),
                    ).unwrap()

                    if (userInfo) {
                        const { username, bio, created_at, is_admin } = userInfo

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

            /**
             * Authorization information after successful authorization
             * */
            let authData: AuthResponse | null = null
            /**
             * Session information after successfully retrieving the current session
             * */
            let sessionData: Awaited<ReturnType<GoTrueClient['getSession']>> | null = null

            // Selecting the authorization type
            dispatch(setAuthLoading(true))
            if (typeAuth !== 'checkSession' && email && password && !authAccessToken) {
                authData = await supabaseClient.auth[
                    typeAuth === 'login' ? 'signInWithPassword' : 'signUp'
                ]({ email, password })
            } else if (!authAccessToken) {
                sessionData = await supabaseClient.auth.getSession()
            }

            dispatch(setAuthLoading(false))
            await getUserData(
                authData?.data.user || sessionData?.data.session?.user,
                authData?.data.session || sessionData?.data.session,
                authData?.error || sessionData?.error,
            )
        },
    })
}
