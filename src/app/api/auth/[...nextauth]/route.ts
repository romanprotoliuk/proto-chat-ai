import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { signInWithSupabase } from "@/utils/supabase-auth";
import { supabase } from "@/utils/supabase";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          // Specific scopes as per X documentation
          scope: [
            "tweet.read",
            "users.read",
            "offline.access"
          ].join(" "),
          // Force PKCE
          code_challenge_method: "S256",
          response_type: "code",
        },
      },
      // Proper token endpoint as per X docs
      token: {
        url: "https://api.twitter.com/2/oauth2/token",
      },
      // User info endpoint with required fields
      userinfo: {
        url: "https://api.twitter.com/2/users/me",
        params: {
          "user.fields": "id,name,profile_image_url,username,verified"
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.id) {
        try {
          await signInWithSupabase(user.id);
          return true;
        } catch (error) {
          console.error('Supabase auth error:', error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        // Get Supabase session
        const { data: { session: supabaseSession } } = await supabase.auth.getSession();
        if (supabaseSession) {
          session.supabaseAccessToken = supabaseSession.access_token;
        }
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };