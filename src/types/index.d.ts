// Message types
export type MessageRole = 'user' | 'ai';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

// Chat context types
export type ChatContextType = {
  messages: Message[];
  addMessage: (content: string, role: MessageRole) => Promise<void>;
  isLoading: boolean;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loadConversations: () => Promise<void>;
};

// Code block types
export type CodeBlockProps = {
  code: string;
  language?: string;
};

// API response types
export type APIResponse = {
  message?: {
    content: string;
  };
  error?: string;
};