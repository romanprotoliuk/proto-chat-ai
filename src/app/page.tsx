'use client';

import Image from "next/image";
import Chat from "@/components/ui/chat";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  // Replace the simple console.log with this
  useEffect(() => {
    console.log('Full Session:', JSON.stringify(session, null, 2));
    console.log('Auth User ID:', session?.user?.id);
  }, [session]);

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

        {/* auth component */}
        <div className="flex flex-col gap-2 self-stretch pt-4">
          {session && session.user ? (
            <div className="flex flex-col gap-2 self-stretch">
              {/* User Profile Section */}
              <div className="flex items-center gap-3 self-stretch p-3 rounded-lg bg-white">
                <div className="w-8 h-8 relative">
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="w-8 h-8 object-cover rounded-full ring-2 ring-white shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-700 font-medium text-sm">
                        {session.user?.name?.[0] || session.user?.email?.[0] || '?'}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white" />
                </div>
                <div className="flex flex-col gap-0.5 grow">
                  <span className="font-semibold text-sm text-neutral-900">
                    {session.user?.name || session.user?.email}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Active now
                  </span>
                </div>
              </div>

              {/* Sign Out Button - Separated */}
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 
                  hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-200"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 self-stretch bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col gap-2 self-stretch">
                <div className="flex items-center gap-2 self-stretch">
                  <svg 
                    className="w-5 h-5 text-indigo-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-semibold text-base text-neutral-900">
                    Welcome to Chat AI
                  </span>
                </div>
                <span className="font-normal text-sm text-neutral-600 leading-relaxed">
                  Sign in to save your chat history, share conversations, and get a personalized experience.
                </span>
              </div>
              <div className="flex flex-col gap-2 self-stretch">
                <button
                  onClick={() => signIn('twitter')}
                  className="flex justify-center items-center gap-2 self-stretch bg-indigo-600 
                    px-4 py-2.5 rounded-lg text-white font-medium text-sm
                    hover:bg-indigo-700 transform transition-all duration-200 
                    hover:translate-y-[-1px] hover:shadow-md active:translate-y-[1px]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Sign in with X
                </button>
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-neutral-500">or</span>
                  </div>
                </div>
                <button
                  onClick={() => signIn()}
                  className="flex justify-center items-center gap-2 self-stretch px-4 py-2.5 
                    rounded-lg border border-neutral-200 text-neutral-700 font-medium text-sm
                    hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200"
                >
                  Continue with email
                </button>
              </div>
              <p className="text-xs text-center text-neutral-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* main content */}
      <Chat />
    </div>
  );
}
