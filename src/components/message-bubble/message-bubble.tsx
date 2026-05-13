import { Typography } from '@getgo/chameleon-web-react-wrapper';

import { Message } from 'types/chat';

import './message-bubble.css';

interface MessageBubbleProps {
  message?: Message;
  isTyping?: boolean;
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageBubble = ({ message, isTyping }: MessageBubbleProps): JSX.Element => {
  if (isTyping) {
    return (
      <div className="message-bubble message-bubble--bot">
        <div className="message-bubble__avatar message-bubble__avatar--bot">CE</div>
        <div className="message-bubble__body">
          <div className="message-bubble__typing">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (!message) return <></>;

  const isUser = message.role === 'user';

  return (
    <div className={`message-bubble message-bubble--${message.role}`}>
      {!isUser && <div className="message-bubble__avatar message-bubble__avatar--bot">CE</div>}
      <div className="message-bubble__body">
        <div className={`message-bubble__content message-bubble__content--${message.role}`}>
          <Typography tag="p" variant="body-medium">
            {message.content}
          </Typography>
        </div>
        <Typography tag="span" variant="caption-medium" className="message-bubble__time">
          {formatTime(message.timestamp)}
        </Typography>
      </div>
      {isUser && <div className="message-bubble__avatar message-bubble__avatar--user">You</div>}
    </div>
  );
};

export default MessageBubble;
