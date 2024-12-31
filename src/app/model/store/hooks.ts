import { useDispatch, useSelector } from 'react-redux'
import { TDispatch, TState } from '@/app/model'

export const useAppSelector = useSelector.withTypes<TState>()
export const useAppDispatch = useDispatch.withTypes<TDispatch>()
