import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    supabaseAccessToken?: string;
  }
}

// Also extend the JWT type to include the access token
declare module 'next-auth/jwt' {
  interface JWT {
    supabaseAccessToken?: string;
  }
}