import { Button, Typography } from '@getgo/chameleon-web-react-wrapper';

import ChatInput from 'components/chat-input';
import MessageList from 'components/message-list';
import { useAppDispatch, useAppSelector } from 'hooks';
import { createConversation, selectActiveConversation } from 'modules/conversations';

import './chat-window.css';
import { AddFilledIcon } from '@getgo/chameleon-icons/react';

const ChatWindow = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const activeConversation = useAppSelector(selectActiveConversation);

  return (
    <main className="chat-window">
      <div className="chat-window__header">
        <Typography tag="h2" variant="heading-medium">
          Commerce Expert
        </Typography>
        <div className="chat-window__badges">
          <span className="chat-window__badge chat-window__badge--pm">PM</span>
          <span className="chat-window__badge chat-window__badge--care">Care Rep</span>
          <span className="chat-window__badge chat-window__badge--dev">Developer</span>
        </div>
      </div>

      {activeConversation ? (
        <>
          <MessageList />
          <ChatInput />
        </>
      ) : (
        <div className="chat-window__empty">
          <div className="chat-window__empty-icon">💬</div>
          <Typography tag="h3" variant="heading-small">
            Ask Commerce Expert anything
          </Typography>
          <Typography tag="p" variant="body-medium" className="chat-window__empty-subtitle">
            Get instant answers about subscriptions, payments, orders, and more.
          </Typography>
          <Typography tag="p" variant="body-medium" className="chat-window__empty-subtitle">
            Start a{' '}
            <Button
              className="chat-window__button"
              variant="secondary"
              leadingIcon={<AddFilledIcon />}
              onClick={() => dispatch(createConversation())}
            >
              New Chat
            </Button>{' '}
            to get started.
          </Typography>
          <div className="chat-window__suggestions">
            <Typography tag="p" variant="body-small" className="chat-window__suggestions-label">
              Try asking:
            </Typography>
            <div className="chat-window__suggestion-chips">
              <span className="chat-window__chip">Why was a customer charged twice?</span>
              <span className="chat-window__chip">How do I cancel a subscription?</span>
              <span className="chat-window__chip">What happens when a payment fails?</span>
              <span className="chat-window__chip">How does the quote-to-order flow work?</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatWindow;
