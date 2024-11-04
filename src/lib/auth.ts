import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: [
            "tweet.read",
            "users.read",
            "offline.access"
          ].join(" "),
          code_challenge_method: "S256",
          response_type: "code",
        },
      },
      token: {
        url: "https://api.twitter.com/2/oauth2/token",
      },
      userinfo: {
        url: "https://api.twitter.com/2/users/me",
        params: {
          "user.fields": "id,name,profile_image_url,username,verified"
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};