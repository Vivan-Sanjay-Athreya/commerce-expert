import ChatWindow from 'components/chat-window';
import Sidebar from 'components/sidebar';

import './app-shell.css';

const AppShell = (): JSX.Element => (
  <div className="app-shell">
    <Sidebar />
    <ChatWindow />
  </div>
);

export default AppShell;
