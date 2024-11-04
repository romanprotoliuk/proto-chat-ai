import ChatListItem from './chat-list-item';
import { Chat } from '@/types/index';

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  deleteChat: (id: string) => void;
}

export default function ChatList({ chats, activeChat, setActiveChat, deleteChat }: ChatListProps) {
  return (
    <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isActive={activeChat === chat.id}
          onSelect={() => setActiveChat(chat.id)}
          onDelete={() => deleteChat(chat.id)}
        />
      ))}
    </div>
  );
}