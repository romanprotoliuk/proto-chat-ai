'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '@/types';

type ChatContextType = {
  messages: Message[];
  addMessage: (content: string, role: 'user' | 'ai') => void;
  isLoading: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = async (content: string, role: 'user' | 'ai') => {
    // Add user message immediately
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    // If it's a user message, get AI response
    if (role === 'user') {
      setIsLoading(true);
      try {
        const response = await fetch('/api/xai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: content }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        // Add AI response
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: data.message.content,
          role: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        // Optionally add an error message to the chat
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}