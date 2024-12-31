import { SUPABASE_KEY, SUPABASE_URL } from '@/app/api'
import { TAuthAccessToken } from '@entities/LoginModal'

export const fetchRequest = async <dataResponses, bodyRequest>(
    rpcUrl: string,
    bodyRequest: bodyRequest,
    accessToken: TAuthAccessToken,
    method?: RequestInit['method'],
): Promise<dataResponses> => {
    const responses = await fetch(SUPABASE_URL + rpcUrl, {
        method: method ?? 'POST',
        credentials: 'same-origin',
        headers: {
            apiKey: SUPABASE_KEY,
            Authorization: 'Bearer ' + (accessToken ?? SUPABASE_KEY),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRequest),
    })

    const data = await responses.json()

    if (!responses.ok) {
        throw new Error(JSON.stringify(data))
    }

    return data
}
