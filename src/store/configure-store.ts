import { configureStore } from '@reduxjs/toolkit';

import { RootState } from 'types/root';
import rootReducer from './reducers';

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = setupStore();
