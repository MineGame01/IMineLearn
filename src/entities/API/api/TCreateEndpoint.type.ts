import { TEndpoint } from './TEndpoint.type'

export type TCreateEndpoint = <GDataResponses extends object | null, GBodyRequest extends object>(
    rpcUrl: string,
) => TEndpoint<Promise<GDataResponses>, GBodyRequest>
