export type TEndpoint<
    GDataResponses extends object | null = object | null,
    GBodyRequest extends object = object,
> = (bodyRequest: GBodyRequest) => Promise<GDataResponses>
