import { supabase } from '@/utils/supabase';
import type { Conversation, Message } from '@/types/database';
import type { MessageRole } from '@/types';

export const conversationsService = {
  async createConversation(userId: string, title: string) {
    console.log('Creating conversation with:', { userId, title });
    
    // First, verify the auth context
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Supabase auth user:', user);

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        title,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error details@@@:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    return data as Conversation;
  },

  async getConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data as Conversation[];
  },

  async addMessage(conversationId: string, content: string, role: MessageRole) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Message;
  },

  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Message[];
  }
};