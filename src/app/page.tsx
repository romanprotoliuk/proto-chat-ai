'use client';

import Image from "next/image";
import Chat from "@/components/ui/chat";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    // main containter
    <div className="global-container">
      {/* left sidebar */}
      <div className="left-container">
        {/* Logo */}
        <div className="flex justify-between items-center self-stretch px-1 py-4">
          <div className="w-[86px] flex">
            <div className="w-[86px] h-8">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
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
              <div className="flex">
                <div className="w-8 h-8 rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 rounded opacity-0">
            <div className="w-5 h-5">
              <div className="w-[16.666667938232422px] h-[16.666667938232422px]">
                <svg className="w-[8.838805198669434px] h-[8.838805198669434px] text-neutral-600"></svg>
              </div>
            </div>
          </div>
        </div>

        {/* chat history */}
        <div className="flex flex-col gap-4 self-stretch grow">
          <div className="flex flex-col gap-3 self-stretch grow">
            <div className="flex flex-col self-stretch bg-neutral-50 rounded">
              <div className="flex items-center gap-2 self-stretch p-1.5 rounded-tr-lg rounded-br-lg">
                <div
                  style={{ display: "flex", alignItems: "left", gap: "8px" }}
                >
                  <Image
                    src="/icons/flashlight-line.png"
                    alt="Lightning icon"
                    width={20}
                    height={40}
                  />
                  <span className="font-medium text-sm text-indigo-700">
                    Ongoing prompt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replace the user avatar section with the auth component */}
        <div className="flex flex-col gap-2 self-stretch pt-4">
          {session ? (
            <div className="flex items-center gap-3 self-stretch p-2 rounded">
              <div className="w-6 h-6">
                {session.user?.image && (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-6 h-6 object-cover rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col gap-0.5 grow">
                <span className="font-semibold text-sm text-neutral-900">
                  {session.user?.name || session.user?.email}
                </span>
              </div>
              <button 
                onClick={() => signOut()}
                className="text-sm text-neutral-700 hover:text-neutral-900"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 self-stretch bg-white p-4 rounded-lg border border-solid border-neutral-200">
              <div className="flex flex-col gap-1 self-stretch">
                <div className="flex items-center self-stretch">
                  <span className="font-medium text-sm text-neutral-900">
                    Let&apos;s create an account
                  </span>
                </div>
                <span className="font-normal text-xs text-neutral-600">
                  Save your chat history, share chat, and personalize your experience.
                </span>
              </div>
              <div className="flex flex-col gap-1 self-stretch">
                <button
                  onClick={() => signIn()}
                  className="flex justify-center items-center gap-1 self-stretch bg-indigo-700 px-3 py-2 rounded"
                >
                  <span className="font-medium text-sm text-white">
                    Sign in
                  </span>
                </button>
                <button
                  onClick={() => signIn()}
                  className="flex justify-center items-center gap-1 self-stretch px-3 py-2 rounded"
                >
                  <span className="font-medium text-sm text-indigo-700">
                    Create account
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* main content */}
      <Chat />
    </div>
  );
}
