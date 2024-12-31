import { TEndpoint, TErrorResponses } from '@/entities/API'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/model'
import { selectAuthAccessToken } from '@widgets/LoginModal'

export const useAppFetch = <
    GDataResponses extends Awaited<ReturnType<GEndpoint>>,
    GEndpoint extends TEndpoint<any, any>,
    GBodyRequest extends Parameters<GEndpoint>[0] = Parameters<GEndpoint>[0],
>(
    endpoint: GEndpoint,
    bodyRequest: GBodyRequest,
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<GDataResponses | null>(null)
    const [error, setError] = useState<TErrorResponses | null>(null)

    const authAccessToken = useAppSelector(selectAuthAccessToken)

    useEffect(() => {
        const request = async () => {
            setIsLoading(true)
            try {
                const data = await endpoint(bodyRequest, authAccessToken)
                setData(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(JSON.parse(error.message))
                } else {
                    throw error
                }
            } finally {
                setIsLoading(false)
            }
        }

        if (!data) {
            void request()
        }
    }, [data, endpoint, bodyRequest, authAccessToken])

    return { data, error, isLoading }
}
