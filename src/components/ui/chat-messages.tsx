'use client';

import { useChatContext } from '@/context/chat-context';
import { useEffect, useRef } from 'react';

export default function ChatMessages() {
  const { messages } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-message ${
            message.role === 'user' ? 'user-message' : 'ai-message'
          }`}
        >
          {message.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}