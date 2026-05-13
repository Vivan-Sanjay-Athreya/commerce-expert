import { Typography } from '@getgo/chameleon-web-react-wrapper';

import { useAppDispatch, useAppSelector } from 'hooks';
import { selectActiveConversationId, setActiveConversation } from 'modules/conversations';
import { Conversation } from 'types/chat';

import './conversation-item.css';

interface ConversationItemProps {
  conversation: Conversation;
}

const formatRelativeTime = (timestamp: number): string => {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

const ConversationItem = ({ conversation }: ConversationItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeId = useAppSelector(selectActiveConversationId);
  const isActive = activeId === conversation.id;

  return (
    <button
      className={`conversation-item${isActive ? ' conversation-item--active' : ''}`}
      onClick={() => dispatch(setActiveConversation(conversation.id))}
    >
      <Typography tag="span" variant="body-small" className="conversation-item__title">
        {conversation.title}
      </Typography>
      <Typography tag="span" variant="caption-medium" className="conversation-item__time">
        {formatRelativeTime(conversation.createdAt)}
      </Typography>
    </button>
  );
};

export default ConversationItem;
