export type Message = {
    id: string;
    content: string;
    role: 'user' | 'ai';
    timestamp: Date;
  }