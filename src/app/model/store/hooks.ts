import { useDispatch, useSelector } from 'react-redux'
import { TDispatch, TState } from '../../../entities/Store/model/types.type'

export const useAppSelector = useSelector.withTypes<TState>()
export const useAppDispatch = useDispatch.withTypes<TDispatch>()
