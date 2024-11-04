interface UserProfileProps {
    user: {
      image?: string | null;
      name?: string | null;
    };
    onSignOut: () => void;
  }
  
  export default function UserProfile({ user, onSignOut }: UserProfileProps) {
    return (
      <div className="flex flex-col gap-2 self-stretch">
        <div className="flex items-center gap-3 p-3">
          <div className="relative">
            {user.image && (
              <>
                <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />
              </>
            )}
          </div>
          <span className="text-sm font-medium">{user.name}</span>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 
            hover:text-neutral-900 hover:bg-neutral-50 rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    );
  }