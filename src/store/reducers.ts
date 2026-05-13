import { combineReducers } from 'redux';

import { conversationsReducer } from 'modules/conversations';
import { uiReducer } from 'modules/ui';

const rootReducer = combineReducers({
  conversations: conversationsReducer,
  ui: uiReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
