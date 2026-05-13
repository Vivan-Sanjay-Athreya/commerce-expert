import { RootState } from 'types/root';

export const selectSidebarCollapsed = (state: RootState) => state.ui.sidebarCollapsed;
