'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Message, MessageRole, ChatContextType, APIResponse, Chat } from '@/types';
import { useSession } from 'next-auth/react';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { data: session, status: sessionStatus } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const handleSetActiveChat = useCallback((chatId: string | null) => {
    console.log('🎯 Activating chat:', chatId);
    setActiveChat(chatId);
  }, []);

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString()
    };
    
    console.log('➕ Creating new chat:', newChat.id);
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  }, []);

  const addMessage = useCallback(async (content: string, role: MessageRole) => {
    if (!activeChat) {
      console.warn('⚠️ Cannot add message: No active chat');
      return;
    }

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role,
      timestamp: new Date(),
    };

    console.log('📝 Adding message to chat:', activeChat);
    
    setChats(prev => {
      const updatedChats = prev.map(chat => {
        if (chat.id === activeChat) {
          const newTitle = chat.title === 'New Chat' && role === 'user' 
            ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
            : chat.title;
          
          return {
            ...chat,
            title: newTitle,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      });
      return updatedChats;
    });

    if (role === 'user') {
      setIsMessageLoading(true);
      try {
        console.log('🤖 Requesting AI response');
        const response = await fetch('/api/xai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: content }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: APIResponse = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.message) {
          const aiMessage: Message = {
            id: crypto.randomUUID(),
            content: data.message.content,
            role: 'ai',
            timestamp: new Date(),
          };

          console.log('🤖 Adding AI response');
          setChats(prev => prev.map(chat => 
            chat.id === activeChat 
              ? { ...chat, messages: [...chat.messages, aiMessage] }
              : chat
          ));
        }
      } catch (error) {
        console.error('❌ API Error:', error);
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          content: 'Sorry, there was an error processing your request.',
          role: 'system',
          timestamp: new Date(),
        };
        setChats(prev => prev.map(chat => 
          chat.id === activeChat 
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        ));
      } finally {
        setIsMessageLoading(false);
      }
    }
  }, [activeChat]);

  const deleteChat = useCallback((chatId: string) => {
    console.log('🗑️ Deleting chat:', chatId);
    
    setChats(prev => {
      const newChats = prev.filter(chat => chat.id !== chatId);
      
      if (activeChat === chatId) {
        const lastChat = newChats[newChats.length - 1];
        handleSetActiveChat(lastChat?.id || null);
      }
      
      return newChats;
    });
  }, [activeChat, handleSetActiveChat]);

  // Session change effect
  useEffect(() => {
    console.log('👤 Auth status:', sessionStatus);
    
    if (sessionStatus === 'loading') return;

    if (sessionStatus === 'unauthenticated') {
      console.log('🔄 Clearing session data');
      setChats([]);
      setActiveChat(null);
      localStorage.removeItem('chats-anonymous');
    } else if (sessionStatus === 'authenticated') {
      const userKey = `chats-${session.user?.id}`;
      const savedChats = localStorage.getItem(userKey);
      
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        console.log('📥 Loading saved chats');
        setChats(parsedChats);
        setActiveChat(parsedChats[parsedChats.length - 1]?.id || null);
      } else {
        console.log('🆕 Creating initial chat');
        const initialChat = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date().toISOString()
        };
        setChats([initialChat]);
        setActiveChat(initialChat.id);
      }
    }
  }, [sessionStatus, session?.user?.id]);

  // Persistence effect
  useEffect(() => {
    const storageKey = session?.user?.id 
      ? `chats-${session.user.id}` 
      : 'chats-anonymous';
    
    if (chats.length > 0) {
      console.log('💾 Persisting chats to storage');
      localStorage.setItem(storageKey, JSON.stringify(chats));
    }
  }, [chats, session?.user?.id]);

  return (
    <ChatContext.Provider value={{ 
      chats,
      activeChat,
      setActiveChat: handleSetActiveChat,
      createNewChat,
      deleteChat,
      addMessage,
      isLoading: isMessageLoading,
      sessionStatus,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}