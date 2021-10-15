import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store';
import {useTransactionCategory} from 'hooks/useTransactionCategory';
import {useKeyboardVisible} from 'hooks/useKeyboardVisible';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useTransactionCategory, useKeyboardVisible};
