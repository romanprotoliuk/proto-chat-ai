'use client';

import { useState, FormEvent, useCallback } from 'react';
import { useChatContext } from '@/context/chat-context';
import { useDebounce, useThrottle } from '@/hooks/hooks';

export default function ChatForm() {
  const [message, setMessage] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const { addMessage, isLoading } = useChatContext();

  // Debounced height adjustment
  const debouncedHeightAdjustment = useDebounce((element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
    setTextareaHeight(`${element.scrollHeight}px`);
  }, 150);

  // Throttled input validation
  // disable eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttledInputValidation = useThrottle((value: string) => {
    // Example validation - you can add more complex validation logic
    const isValid = value.length <= 2000; // Max character limit
    if (!isValid) {
      console.warn('Message too long');
      // You could set an error state here
    }
  }, 500);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Apply debounced height adjustment
    debouncedHeightAdjustment(e.target);
    
    // Apply throttled validation
    throttledInputValidation(value);
  }, [debouncedHeightAdjustment, throttledInputValidation]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    await addMessage(message.trim(), 'user');
    
    setMessage('');
    setTextareaHeight('auto');
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
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
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{ height: textareaHeight }}
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