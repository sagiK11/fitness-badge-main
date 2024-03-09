import { apiConfig } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { HYDRATE } from "next-redux-wrapper";
import getConfig from "next/config";
import { NextRequest } from "next/server";

const { serverRuntimeConfig } = getConfig();
const { baseUrl, publicBaseUrl } = apiConfig;

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: typeof window === "undefined" ? baseUrl : publicBaseUrl,
    credentials: "include",
    prepareHeaders: async (headers, { extra }) => {
      return prepareHeaders(headers, (extra as any).req as NextRequest);
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [
    "all-classrooms",
    "all-students",
    "classroom-available-students",
    "classroom-student",
    "student-available-tests",
    "teacher-classroom",
    "teacher-classrooms",
    "teacher",
  ],
  endpoints: (builder) => ({}),
});

async function prepareHeaders(headers: Headers, req: NextRequest) {
  headers.set("x-role", `teacher`);

  if (typeof window !== "undefined") {
    const session = await getSession();
    headers.set("authorization", `Bearer ${session?.id_token}`);
  } else {
    const sessionToken = await getToken({
      req,
      secret: serverRuntimeConfig.NEXTAUTH_SECRET,
    });
    headers.set("authorization", `Bearer ${sessionToken?.id_token}`);
  }
  return headers;
}
