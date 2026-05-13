import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { RootState } from 'types/root';

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
