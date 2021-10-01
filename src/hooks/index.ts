import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store';
import {useCurrency} from 'hooks/useCurrency';
import {useTransactionCategoryGroup} from 'hooks/useTransactionCategoryGroup';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useCurrency, useTransactionCategoryGroup};