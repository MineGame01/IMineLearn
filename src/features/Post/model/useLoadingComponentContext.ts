import { useContext } from 'react'
import { ContextLoadingComponent } from './contextLoadingComponent'

export const useLoadingComponentContext = () => {
    return useContext(ContextLoadingComponent)
}
