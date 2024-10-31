'use client';

import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    // set auth cookie dummy value
    document.cookie = 'authToken=sampletoken; path=/';
    router.push('/settings'); // redirect to protected page after signing in
  };

  return (
    <div className="text-2xl font-bold text-primary">
      <h1>Sign In Page</h1>
      <button onClick={handleSignIn} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Sign In
      </button>
    </div>
  );
}
