'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Message as UIMessage, MessageRole, ChatContextType } from '@/types';
import { conversationsService } from '@/services/conversations';
import type { Conversation } from '@/types/database';
import { Message as DBMessage } from '@/types/database';
import { useSupabaseAuth } from '@/utils/use-supabase-auth';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const transformDBMessageToUIMessage = (dbMessage: DBMessage): UIMessage => {
  return {
    id: dbMessage.id,
    content: dbMessage.content,
    role: dbMessage.role,
    timestamp: new Date(dbMessage.created_at)
  };
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const { supabase } = useSupabaseAuth();
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      loadConversations();
    }
  }, [session]);

  const loadConversations = async () => {
    if (!session?.user?.id) return;
    const data = await conversationsService.getConversations(session.user.id);
    setConversations(data);
    
    if (data.length > 0) {
      setCurrentConversation(data[0]);
      const dbMessages = await conversationsService.getMessages(data[0].id);
      setMessages(dbMessages.map(transformDBMessageToUIMessage));
    }
  };

  const addMessage = async (content: string, role: MessageRole) => {
    if (!session?.user?.id) {
      console.error('No active session or user ID');
      return;
    }

    try {
      // Create conversation if none exists
      if (!currentConversation) {
        const { data: conversation, error } = await supabase
          .from('conversations')
          .insert({
            user_id: session.user.id,
            title: 'New Chat'
          })
          .select()
          .single();

        if (error) throw error;
        setCurrentConversation(conversation);
      }

      // Add message
      const { data: message, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversation!.id,
          content,
          role
        })
        .select()
        .single();

      if (error) throw error;
      setMessages(prev => [...prev, transformDBMessageToUIMessage(message)]);

      if (role === 'user') {
        setIsLoading(true);
        try {
          const response = await fetch('/api/xai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: content }),
          });

          const data = await response.json();
          
          if (data.error) throw new Error(data.error);

          const dbAiMessage = await conversationsService.addMessage(
            currentConversation!.id,
            data.message.content,
            'ai'
          );
          const uiAiMessage = transformDBMessageToUIMessage(dbAiMessage);
          setMessages(prev => [...prev, uiAiMessage]);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      addMessage, 
      isLoading,
      conversations,
      currentConversation,
      loadConversations 
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