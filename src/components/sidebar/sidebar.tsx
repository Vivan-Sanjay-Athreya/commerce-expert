import { useHistory } from 'react-router-dom';

import { GotoBlackYellowIcon, GotoWhiteYellowIcon, MessageDotsOutlinedIcon, AddFilledIcon, InfoOutlinedIcon } from '@getgo/chameleon-icons/react';
import { Button, Typography } from '@getgo/chameleon-web-react-wrapper';

import { useThemeContext } from 'App';

import { useAppDispatch, useAppSelector } from 'hooks';
import {
  createConversation,
  selectActiveConversationId,
  selectConversations,
  setActiveConversation,
} from 'modules/conversations';
import { Conversation } from 'types/chat';

import './sidebar.css';

const formatRelativeTime = (timestamp: number): string => {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ConversationItem = ({ conversation, isSelected, onSelect }: ConversationItemProps) => (
  <button
    className={`sidebar__conv-item${isSelected ? ' sidebar__conv-item--active' : ''}`}
    onClick={() => onSelect(conversation.id)}
  >
    <MessageDotsOutlinedIcon className="sidebar__conv-icon" />
    <span className="sidebar__conv-text">
      <span className="sidebar__conv-title">{conversation.title}</span>
      <span className="sidebar__conv-time">{formatRelativeTime(conversation.createdAt)}</span>
    </span>
  </button>
);

const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(selectConversations);
  const activeId = useAppSelector(selectActiveConversationId);
  const { theme } = useThemeContext();
  const history = useHistory();

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        {theme === 'dark' ? (
          <GotoWhiteYellowIcon className="sidebar__logo" size="100px" />
        ) : (
          <GotoBlackYellowIcon className="sidebar__logo" size="100px" />
        )}
      </div>

      <div className="sidebar__new-chat">
        <Button
          variant="primary"
          fullWidth
          leadingIcon={<AddFilledIcon />}
          onClick={() => dispatch(createConversation())}
        >
          New Chat
        </Button>
      </div>

      <nav className="sidebar__list">
        {conversations.length === 0 ? (
          <div className="sidebar__empty">
            <Typography tag="p" variant="body-small" className="sidebar__empty-text">
              No conversations yet
            </Typography>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={activeId === conversation.id}
              onSelect={(id) => dispatch(setActiveConversation(id))}
            />
          ))
        )}
      </nav>

      <div className="sidebar__footer">
        <Button
          variant="tertiary"
          fullWidth
          leadingIcon={<InfoOutlinedIcon />}
          onClick={() => history.push('/about')}
        >
          About this project
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
