import { TAuthAccessToken } from '@entities/LoginModal'

export type TEndpoint<
    GDataResponses extends object | null = object | null,
    GBodyRequest extends object = object,
> = (bodyRequest: GBodyRequest, accessToken: TAuthAccessToken) => Promise<GDataResponses>
