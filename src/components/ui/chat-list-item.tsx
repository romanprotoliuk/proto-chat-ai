import { Chat } from "@/types/index";

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function ChatListItem({ chat, isActive, onSelect, onDelete }: ChatListItemProps) {
  return (
    <div className="flex items-center gap-2 group">
      <button
        onClick={onSelect}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 grow
          ${isActive ? 'bg-neutral-100 text-neutral-900' : 'hover:bg-neutral-50 text-neutral-600'}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-sm font-medium truncate">
          {chat.title.trim().slice(0, 10)}
          {chat.title.length > 10 && '...'}
        </span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm('Are you sure you want to delete this chat?')) {
            onDelete();
          }
        }}
        className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 
          opacity-0 group-hover:opacity-100 transition-all duration-200"
        aria-label="Delete chat"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}