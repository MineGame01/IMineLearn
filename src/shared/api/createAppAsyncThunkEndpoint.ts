import { createAppAsyncThunk } from '@/app/model'
import { selectauthUserId } from '@/widgets/LoginModal'

export const createAppAsyncThunkEndpoint = <TEndpoint extends (bodyRequest: any) => object | null>(
    prefix: string,
    endpoint: TEndpoint,
) => {
    type TEndpointBodyRequest = Parameters<TEndpoint>[0]

    return createAppAsyncThunk(
        prefix,
        async (bodyRequest: Omit<TEndpointBodyRequest, 'user_id'>, { getState }) => {
            const bodyRequestInit: TEndpointBodyRequest = {
                ...bodyRequest,
            }

            if (endpoint.arguments[0]['user_id']) {
                const state = getState()
                bodyRequestInit['user_id'] = selectauthUserId(state)
            }

            const data = await endpoint(bodyRequestInit)
            return data
        },
    )
}
