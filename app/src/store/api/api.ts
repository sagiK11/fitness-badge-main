import { apiConfig } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "next-auth/jwt";
import { HYDRATE } from "next-redux-wrapper";
import getConfig from "next/config";

const { baseUrl, publicBaseUrl } = apiConfig;

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: typeof window === "undefined" ? baseUrl : publicBaseUrl,
    credentials: "include",
    prepareHeaders: async (headers, { extra }) => {
      headers.set("x-role", `teacher`);

      const ctx = extra as any;
      if (typeof window === "undefined" && "req" in ctx) {
        const { serverRuntimeConfig } = getConfig();
        const token = await getToken({
          req: ctx.req,
          secret: serverRuntimeConfig.NEXTAUTH_SECRET,
        });
        if (token) {
          headers.set("authorization", `${token.token_type} ${token.id_token}`);
        }
      }
      return headers;
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
