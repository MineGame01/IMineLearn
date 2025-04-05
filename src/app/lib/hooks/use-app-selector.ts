import { useSelector } from 'react-redux';
import { TState } from '@app/model';

export const useAppSelector = useSelector.withTypes<TState>();
