import React, { useEffect } from 'react'
import { Header } from '@widgets/Header'
import { HomePage } from '@pages/Home/ui/HomePage.tsx'
import { supabaseClient } from './app/api'
import { useAppDispatch } from './app/model'
import { authLogin, updateAccessToken } from '@widgets/LoginModal'

export const App: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const request = async () => {
            dispatch(authLogin(null, null, 'checkSession'))

            supabaseClient.auth.onAuthStateChange(
                (_event, session) => {
                    const accessToken = session?.access_token
                    if (accessToken) {
                        dispatch(updateAccessToken(accessToken))
                    }
                },
            )
        }

        void request()
    }, [dispatch])

    return (
        <>
            <Header />
            <HomePage />
        </>
    )
}
