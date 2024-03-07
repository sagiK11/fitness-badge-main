import NextAuth, { AuthOptions, TokenSet } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: serverRuntimeConfig.GOOGLE_CLIENT_ID,
      clientSecret: serverRuntimeConfig.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          profile,
          user,
          id_token: account.id_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: serverRuntimeConfig.GOOGLE_CLIENT_ID,
              client_secret: serverRuntimeConfig.GOOGLE_CLIENT_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),
            method: "POST",
          });

          const tokens: TokenSet = await response.json();
          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            id_token: tokens.id_token,
            expires_at: Math.floor(
              Date.now() / 1000 + (tokens.expires_at ?? 0)
            ),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token;
      session.user = token.user;
      session.error = token.error;
      return session;
    },
  },
  // debug: process.env.NODE_ENV === "development",
  secret: serverRuntimeConfig.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
