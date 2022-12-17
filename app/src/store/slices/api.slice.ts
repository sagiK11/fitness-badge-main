import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Teacher } from "@models";
import { APIConfig } from "@config";

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIConfig.endpoint }),
  tagTypes: ["teachers"],
  endpoints: (builder) => ({
    getTeacherByEmail: builder.query<Teacher, string>({
      query: (email) => `/teachers/${email}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTeacherByEmailQuery } = mainAPI;
