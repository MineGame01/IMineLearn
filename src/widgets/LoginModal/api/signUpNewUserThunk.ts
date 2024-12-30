import { supabaseClient } from '@/app/api'
import { createAppAsyncThunk } from '@/app/model'
import { TAuthUSerEmail } from '@/entities/LoginModal'

export const signUpNewUserThunk = createAppAsyncThunk(
    'auth/signUpNewUser',
    async ({ email, password }: { email: NonNullable<TAuthUSerEmail>; password: string }) => {
        const data = await supabaseClient.auth.signUp({
            email,
            password,
        })
        return data
    },
)
