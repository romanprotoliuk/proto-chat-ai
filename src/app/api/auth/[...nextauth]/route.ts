import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

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
    async jwt({ token, account }) {
      // Save the access token and refresh token in the JWT on the initial sign-in
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // TODO: Make access token available on the client
      console.log("Session callback", { session, token });
      return {
        ...session,
        id: token.sub,
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };