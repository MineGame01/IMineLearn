import { MutableRefObject, useEffect } from 'react'

export const useSiblingStyles = <
    T extends
        | HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
        | null = HTMLElementTagNameMap['article'],
>(
    ref: MutableRefObject<T>,
) => {
    useEffect(() => {
        const element = ref.current
        if (element) {
            const previousElement = element.previousElementSibling as T
            const nextElement = element.nextElementSibling as T
            const tagNameElement = element.tagName

            if (previousElement && previousElement.tagName === tagNameElement) {
                previousElement.style.borderEndEndRadius = '0%'
                previousElement.style.borderEndStartRadius = '0%'

                element.style.borderStartEndRadius = '0%'
                element.style.borderStartStartRadius = '0%'
                element.style.borderBlockStart = 'none'
            } else if (nextElement && nextElement.className === tagNameElement) {
                nextElement.style.borderStartEndRadius = '0%'
                nextElement.style.borderStartStartRadius = '0%'

                element.style.borderEndEndRadius = '0%'
                element.style.borderEndStartRadius = '0%'
                element.style.borderBlockEnd = 'none'
            }
        }
    }, [ref])
}
