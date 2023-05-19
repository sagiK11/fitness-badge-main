import { withAuth } from "next-auth/middleware";

const middleware = withAuth({
  pages: {
    signIn: "/auth",
  },
});

export default middleware;
