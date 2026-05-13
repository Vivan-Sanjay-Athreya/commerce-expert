import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chatDao } from 'dao/chat-dao';
import { Conversation, Message } from 'types/chat';
import { generateId } from 'utils/id-utils';

interface ConversationsState {
  conversations: Conversation[];
  activeConversationId: string | null;
}

const initialState: ConversationsState = {
  conversations: [],
  activeConversationId: null,
};

export const sendMessage = createAsyncThunk(
  'conversations/sendMessage',
  async ({ conversationId, content }: { conversationId: string; content: string }) => {
    const response = await chatDao.sendMessage(content);
    return { conversationId, response };
  },
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    createConversation(state) {
      const newConversation: Conversation = {
        id: generateId(),
        title: 'New conversation',
        createdAt: Date.now(),
        messages: [],
        isLoading: false,
      };
      state.conversations.unshift(newConversation);
      state.activeConversationId = newConversation.id;
    },
    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
    },
    addUserMessage(state, action: PayloadAction<{ conversationId: string; content: string }>) {
      const { conversationId, content } = action.payload;
      const conversation = state.conversations.find((c) => c.id === conversationId);
      if (!conversation) return;

      const isFirstMessage = conversation.messages.length === 0;
      if (isFirstMessage) {
        conversation.title = content.slice(0, 40);
      }

      const message: Message = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };
      conversation.messages.push(message);
      conversation.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversationId, response } = action.payload;
        const conversation = state.conversations.find((c) => c.id === conversationId);
        if (!conversation) return;

        const botMessage: Message = {
          id: generateId(),
          role: 'bot',
          content: response,
          timestamp: Date.now(),
        };
        conversation.messages.push(botMessage);
        conversation.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const conversationId = action.meta.arg.conversationId;
        const conversation = state.conversations.find((c) => c.id === conversationId);
        if (!conversation) return;

        const errorMessage: Message = {
          id: generateId(),
          role: 'bot',
          content: 'Something went wrong. Please try again.',
          timestamp: Date.now(),
        };
        conversation.messages.push(errorMessage);
        conversation.isLoading = false;
      });
  },
});

export const { createConversation, setActiveConversation, addUserMessage } = conversationsSlice.actions;
export default conversationsSlice.reducer;
