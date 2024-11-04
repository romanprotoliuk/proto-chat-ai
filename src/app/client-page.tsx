'use client';

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Chat from "@/components/ui/chat";
import { useChatContext } from "@/context/chat-context";
import Image from "next/image";
import LoadingSkeleton from '@/components/ui/loading-skeleton';

export default function ClientPage() {
  const { data: session, status } = useSession();
  const { chats, activeChat, setActiveChat, createNewChat, deleteChat } = useChatContext();

  if (status === 'loading') {
    return <LoadingSkeleton />;
  }

  return (
    <div className="global-container">
      <div className="left-container">
        {/* Logo */}
        <div className="flex justify-between items-center self-stretch px-1 py-4">
          <div className="w-[86px] flex">
            <div className="w-[86px] h-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/chat.png"
                  alt="Chat icon"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
                <span className="font-bold text-base text-neutral-900">
                  Chat AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {session ? (
          <>
            {/* New Chat Button */}
            <button
              onClick={createNewChat}
              className="flex items-center gap-2 self-stretch p-3 rounded-lg hover:bg-neutral-50"
            >
              <svg
                className="w-5 h-5 text-neutral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-sm text-neutral-600">New Chat</span>
            </button>

            {/* Chat List */}
            <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div key={chat.id} className="flex items-center gap-2 group">
                  <button
                    onClick={() => setActiveChat(chat.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 grow
                      ${activeChat === chat.id
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'hover:bg-neutral-50 text-neutral-600'
                      }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-sm font-medium truncate">
                      {chat.title}
                    </span>
                  </button>
                  
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this chat?')) {
                        deleteChat(chat.id);
                      }
                    }}
                    className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 
                      opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label="Delete chat"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* User Profile */}
            <div className="flex flex-col gap-2 self-stretch">
              <div className="flex items-center gap-3 p-3">
                <div className="relative">
                  {session.user?.image && (
                    <>
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />
                    </>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {session.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 
                  hover:text-neutral-900 hover:bg-neutral-50 rounded-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6 self-stretch bg-white p-5 rounded-xl border border-neutral-200">
            <div className="flex flex-col gap-2 self-stretch">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="font-semibold text-base text-neutral-900">
                  Welcome to Chat AI
                </span>
              </div>
              <span className="text-sm text-neutral-600">
                Sign in to save your chat history and get personalized experiences.
              </span>
            </div>
            <button
              onClick={() => signIn("twitter")}
              className="flex justify-center items-center gap-2 w-full bg-indigo-600 
                px-4 py-2.5 rounded-lg text-white hover:bg-indigo-700"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Sign in with X
            </button>
          </div>
        )}
      </div>

      <Chat />
    </div>
  );
}