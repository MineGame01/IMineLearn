import { supabaseClient } from '@/app/api'
import { createAppAsyncThunk } from '@/app/model'
import { TAuthUSerEmail } from '@/entities/LoginModal'

export const signInWithEmailThunk = createAppAsyncThunk(
    'auth/signInWithEmail',
    async ({ email, password }: { email: NonNullable<TAuthUSerEmail>; password: string }) => {
        const data = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        })
        return data
    },
)
