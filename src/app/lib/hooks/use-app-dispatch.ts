import { useDispatch } from 'react-redux';
import { TDispatch } from '@app/model';

export const useAppDispatch = useDispatch.withTypes<TDispatch>();
