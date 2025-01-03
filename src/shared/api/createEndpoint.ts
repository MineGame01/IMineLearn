import { TEndpoint } from '@/entities/API'
import { fetchRequest } from './fetchRequest'

export const createEndpoint = <GDataResponses extends object | null, GBodyRequest extends object>(
    rpcUrl: string,
): TEndpoint<GDataResponses, GBodyRequest> => {
    return async (bodyRequest, accessToken) => {
        const data = await fetchRequest<GDataResponses, typeof bodyRequest>(
            rpcUrl,
            bodyRequest,
            accessToken,
        )
        return data
    }
}
