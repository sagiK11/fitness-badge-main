import { routesTree } from "@/routesTree";
import {
  useSession,
  signIn as baseSignIn,
  signOut as baseSignOut,
} from "next-auth/react";

export function useAuth() {
  const { status, data } = useSession();

  const signOut = async () => {
    await baseSignOut({ redirect: true, callbackUrl: routesTree().auth });
  };

  const signIn = (...args: Parameters<typeof baseSignIn>) => {
    return baseSignIn("google", {
      callbackUrl: routesTree().home,
      redirect: true,
    });
  };

  return {
    signIn,
    signOut,
    status,
    user: data?.user,
  };
}
