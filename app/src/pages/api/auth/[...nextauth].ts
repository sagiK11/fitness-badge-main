import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: serverRuntimeConfig.GOOGLE_CLIENT_ID,
      clientSecret: serverRuntimeConfig.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
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
