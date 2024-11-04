'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Chat from "@/components/ui/chat";
import { useChatContext } from "@/context/chat-context";
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import Logo from "@/components/ui/logo";
import ChatList from "@/components/ui/chat-list";
import NewChatButton from "@/components/ui/new-chat-button";
import UserProfile from "@/components/ui/user-profile";
import SignInPrompt from "@/components/ui/sign-in-prompt";
import HealthDataForm from "@/components/health/health-data-form";
import HealthDataDisplay from "@/components/ui/health-data-display";
import { ChatContextType } from "@/types";

export default function ClientPage() {
  const { data: session, status } = useSession();
  const [showHealthForm, setShowHealthForm] = useState(false);
  const { 
    chats, 
    activeChat, 
    setActiveChat, 
    createNewChat, 
    deleteChat,
    isLoading 
  } = useChatContext() as ChatContextType;

  if (status === 'loading') {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <div className="global-container">
        <div className="left-container">
          <Logo />
          {session ? (
            <>
              <NewChatButton createNewChat={createNewChat} />
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">Health Data</span>
                <button
                  onClick={() => setShowHealthForm(true)}
                  className="text-xs px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 
                    hover:bg-indigo-100 transition-colors"
                >
                  Add Metric
                </button>
              </div>
              <HealthDataDisplay />
              <ChatList
                chats={chats}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                deleteChat={deleteChat}
              />
              <UserProfile user={session.user} onSignOut={() => signOut()} />
            </>
          ) : (
            <SignInPrompt onSignIn={() => signIn("twitter")} />
          )}
        </div>
        <Chat />
      </div>

      <HealthDataForm
        isOpen={showHealthForm}
        onClose={() => setShowHealthForm(false)}
        onSubmitSuccess={() => {
          console.log('Health metric added successfully');
        }}
      />
    </>
  );
}