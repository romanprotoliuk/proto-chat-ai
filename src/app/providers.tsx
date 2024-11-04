'use client';

import { SessionProvider } from 'next-auth/react';
import { ChatProvider } from '@/context/chat-context';
import { HealthProvider } from '@/context/health-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HealthProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </HealthProvider>
    </SessionProvider>
  );
}