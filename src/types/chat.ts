export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
  isLoading: boolean;
}
