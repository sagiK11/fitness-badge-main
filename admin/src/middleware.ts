import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const middleware = withAuth(
  (req: NextRequest) => {
    const res = NextResponse.next();
    const origin = process.env.ACCESS_CONTROL_ALLOW_ORIGIN || "*";
    res.headers.set("Access-Control-Allow-Origin", origin);
    return res;
  },
  {
    pages: {
      signIn: "/auth",
    },
  }
);

export default middleware;
