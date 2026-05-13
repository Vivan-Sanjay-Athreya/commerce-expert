import { KeyboardEvent, useState } from 'react';

import { Button, TextField } from '@getgo/chameleon-web-react-wrapper';

import { useAppDispatch, useAppSelector } from 'hooks';
import { addUserMessage, selectActiveConversationId, selectIsLoading, sendMessage } from 'modules/conversations';

import './chat-input.css';

const ChatInput = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeConversationId = useAppSelector(selectActiveConversationId);
  const isLoading = useAppSelector(selectIsLoading);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || !activeConversationId || isLoading) return;

    dispatch(addUserMessage({ conversationId: activeConversationId, content: trimmed }));
    dispatch(sendMessage({ conversationId: activeConversationId, content: trimmed }));
    setText('');
  };

  // Chameleon TextField emits custom DOM events; cast to access .value
  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    setText(input.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isDisabled = !text.trim() || isLoading || !activeConversationId;

  return (
    <div className="chat-input">
      <div className="chat-input__inner">
        <TextField
          className="chat-input__field"
          fullwidth
          value={text}
          placeholder="Ask anything about commerce..."
          disabled={!activeConversationId}
          // @ts-ignore — Chameleon custom element event; value accessible on e.target
          onChange={handleChange}
          // @ts-ignore
          onKeyDown={handleKeyDown}
        >
          Ask a question
        </TextField>
        <Button variant="primary" disabled={isDisabled} onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
