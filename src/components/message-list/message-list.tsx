import { useLayoutEffect, useRef } from 'react';

import MessageBubble from 'components/message-bubble';
import { useAppSelector } from 'hooks';
import { selectIsLoading, selectMessages } from 'modules/conversations';

import './message-list.css';

const MessageList = (): JSX.Element => {
  const messages = useAppSelector(selectMessages);
  const isLoading = useAppSelector(selectIsLoading);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="message-list">
      <div className="message-list__inner">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <MessageBubble isTyping />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageList;
