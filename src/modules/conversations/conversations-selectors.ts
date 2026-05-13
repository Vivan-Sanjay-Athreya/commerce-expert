import { RootState } from 'types/root';

export const selectConversations = (state: RootState) => state.conversations.conversations;

export const selectActiveConversationId = (state: RootState) => state.conversations.activeConversationId;

export const selectActiveConversation = (state: RootState) => {
  const { conversations, activeConversationId } = state.conversations;
  return conversations.find((c) => c.id === activeConversationId) ?? null;
};

export const selectMessages = (state: RootState) => {
  const active = selectActiveConversation(state);
  return active?.messages ?? [];
};

export const selectIsLoading = (state: RootState) => {
  const active = selectActiveConversation(state);
  return active?.isLoading ?? false;
};
