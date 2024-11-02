'use client';

import { useState, FormEvent } from 'react';
import { useChatContext } from '@/context/chat-context';

export default function ChatForm() {
  const [message, setMessage] = useState('');
  const { addMessage, isLoading } = useChatContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add the message to context
    await addMessage(message.trim(), 'user');
    
    // Clear the input
    setMessage('');
    
    // Reset textarea height
    const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  };

  return (
    <div className="chat-form-container">
      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea 
          className="chat-input"
          placeholder="Type your message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="submit-button"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}