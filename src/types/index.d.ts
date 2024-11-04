import { LucideIcon } from 'lucide-react';

export type MessageRole = "user" | "ai";

export type Message = {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
};

// Add Chat type
export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
};

// Chat context types
export type ChatContextType = {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  createNewChat: () => void;
  deleteChat: (chatId: string) => void;
  addMessage: (content: string, role: MessageRole) => Promise<void>;
  isLoading: boolean;
};

export type PromptType = {
  title: string;
  description: string;
  promptMessage: string;
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
