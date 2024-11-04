interface SignInPromptProps {
    onSignIn: () => void;
  }
  
  export default function SignInPrompt({ onSignIn }: SignInPromptProps) {
    return (
      <div className="flex flex-col gap-6 self-stretch bg-white p-5 rounded-xl border border-neutral-200">
        <div className="flex flex-col gap-2 self-stretch">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
          onClick={onSignIn}
          className="flex justify-center items-center gap-2 w-full bg-indigo-600 
            px-4 py-2.5 rounded-lg text-white hover:bg-indigo-700"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Sign in with X
        </button>
      </div>
    );
  }