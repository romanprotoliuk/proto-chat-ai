'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Message, MessageRole, ChatContextType, APIResponse, Chat } from '@/types';
import { useSession } from 'next-auth/react';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update setActiveChat to be a function that we can track
  const handleSetActiveChat = (chatId: string | null) => {
    console.log('Setting active chat________________:', chatId);
    setActiveChat(chatId);
  };

  // Load chats on mount or when session changes
  useEffect(() => {
    const storageKey = session?.user?.id 
      ? `chats-${session.user.id}` 
      : 'chats-anonymous';
    
    console.log('Loading chats with storage key:', storageKey);
    const savedChats = localStorage.getItem(storageKey);
    
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      console.log('Loaded saved chats:', parsedChats);
      setChats(parsedChats);
      handleSetActiveChat(parsedChats[parsedChats.length - 1]?.id || null);
    } else {
      const initialChat = {
        id: crypto.randomUUID(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date().toISOString()
      };
      setChats([initialChat]);
      handleSetActiveChat(initialChat.id);
    }
  }, [session?.user?.id]);

  // Save chats whenever they change
  useEffect(() => {
    const storageKey = session?.user?.id 
      ? `chats-${session.user.id}` 
      : 'chats-anonymous';
    
    if (chats.length > 0) {
      console.log('Saving chats to storage:', chats);
      localStorage.setItem(storageKey, JSON.stringify(chats));
    }
  }, [chats, session?.user?.id]);

  const createNewChat = () => {
    console.log('Before creating new chat:', {
      currentChats: chats,
      currentActiveChat: activeChat
    });

    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString()
    };
    
    setChats(prev => {
      const newChats = [...prev, newChat];
      console.log('Setting new chats:', newChats);
      return newChats;
    });
    
    setActiveChat(newChat.id);
    
    console.log('After creating new chat:', {
      newChatId: newChat.id,
      newChat
    });
  };

  const addMessage = async (content: string, role: MessageRole) => {
    console.log('Adding message:', {
      content,
      role,
      activeChat,
      currentChats: chats
    });

    if (!activeChat) {
      console.warn('No active chat found');
      return;
    }

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role,
      timestamp: new Date(),
    };

    // Update the messages for the active chat
    setChats(prev => {
      const updatedChats = prev.map(chat => {
        if (chat.id === activeChat) {
          // Update chat title based on first user message if it's still "New Chat"
          const newTitle = chat.title === 'New Chat' && role === 'user' 
            ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
            : chat.title;
          
          console.log('Updating chat:', { chatId: chat.id, newTitle });
          return {
            ...chat,
            title: newTitle,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      });
      console.log('Updated chats:', updatedChats);
      return updatedChats;
    });

    if (role === 'user') {
      setIsLoading(true);
      try {
        console.log('Sending message to API:', content);
        const response = await fetch('/api/xai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: content }),
        });

        const data: APIResponse = await response.json();
        console.log('API response:', data);

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

          console.log('Adding AI response:', aiMessage);
          setChats(prev => prev.map(chat => 
            chat.id === activeChat 
              ? { ...chat, messages: [...chat.messages, aiMessage] }
              : chat
          ));
        }
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteChat = (chatId: string) => {
    console.log('Deleting chat:', chatId);
    
    setChats(prev => {
      const newChats = prev.filter(chat => chat.id !== chatId);
      
      // If we're deleting the active chat, set active chat to the most recent one
      if (activeChat === chatId) {
        const lastChat = newChats[newChats.length - 1];
        handleSetActiveChat(lastChat?.id || null);
      }
      
      return newChats;
    });
  };

  console.log('Current state:', { 
    chats, 
    activeChat, 
    isLoading,
    sessionUserId: session?.user?.id 
  });

  return (
    <ChatContext.Provider value={{ 
      chats,
      activeChat,
      setActiveChat: handleSetActiveChat,
      createNewChat,
      deleteChat,
      addMessage,
      isLoading
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