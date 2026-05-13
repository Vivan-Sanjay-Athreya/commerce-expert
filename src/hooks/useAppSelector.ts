import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from 'types/root';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
