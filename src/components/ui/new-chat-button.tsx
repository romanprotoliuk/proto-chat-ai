export default function NewChatButton({ createNewChat }: { createNewChat: () => void }) {
    return (
      <button
        onClick={createNewChat}
        className="flex items-center gap-2 self-stretch p-3 rounded-lg hover:bg-neutral-50"
      >
        <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm text-neutral-600">New Chat</span>
      </button>
    );
  }