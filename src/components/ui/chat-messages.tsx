'use client';

import { useChatContext } from '@/context/chat-context';
import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import CodeBlock from '../layout/code-block';
import PromptGrid from '@/components/layout/prompt-grid';
import { MessageRole } from '@/types';
import { useHealth } from '@/context/health-context';
import { PromptType } from '@/types/health';

// Helper function to detect and parse code blocks
const parseMessage = (content: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      });
    }

    // Add code block
    parts.push({
      type: 'code',
      language: match[1] || '',
      content: match[2].trim()
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex)
    });
  }

  return parts;
};

export default function ChatMessages() {
  const { chats, activeChat, isLoading, addMessage, createNewChat } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { healthProfile } = useHealth();

  const currentChat = chats.find(chat => chat.id === activeChat);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const formatHealthData = () => {
    if (!healthProfile) return '';

    const metrics = healthProfile.metrics.map(metric => ({
      type: metric.type,
      value: metric.value,
      unit: metric.unit,
      date: new Date(metric.timestamp).toISOString().split('T')[0],
      notes: metric.notes
    }));

    return JSON.stringify(metrics, null, 2);
  };

  const handlePromptSelect = async (prompt: PromptType) => {
    if (prompt.requiresData && !healthProfile) {
      // Show health data form
      setShowHealthForm(true);
      return;
    }

    let message = prompt.promptMessage;
    if (prompt.category === 'health') {
      message += `\n\nMy health data:\n\`\`\`json\n${formatHealthData()}\n\`\`\``;
    }

    await addMessage(message, 'user');
  };

  // Show prompts if no active chat or no messages
  if (!activeChat || !currentChat || messages.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          {!activeChat || !currentChat ? (
            <PromptGrid onPromptSelect={(prompt: string) => handlePromptSelect(prompt as unknown as PromptType)} />
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Start a New Chat</h2>
              <PromptGrid onPromptSelect={(prompt: string) => handlePromptSelect(prompt as unknown as PromptType)} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-message ${
            message.role === 'user' ? 'user-message' : 'ai-message'
          }`}
        >
          {message.role === 'user' ? (
            message.content
          ) : (
            parseMessage(message.content).map((part, index) => (
              part.type === 'code' ? (
                <CodeBlock 
                  key={index}
                  code={part.content}
                  language={part.language}
                />
              ) : (
                <div 
                  key={index}
                  dangerouslySetInnerHTML={{ 
                    __html: marked(part.content, {
                      breaks: false,
                      gfm: false
                    }) 
                  }} 
                />
              )
            ))
          )}
        </div>
      ))}
      {isLoading && (
        <div className="chat-message ai-message">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

function setShowHealthForm(arg0: boolean) {
    throw new Error('Function not implemented.');
}
