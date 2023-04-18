import { apiConfig } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
const { baseUrl, publicBaseUrl } = apiConfig;

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: typeof window === "undefined" ? baseUrl : publicBaseUrl,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [
    "all-classrooms",
    "all-students",
    "classroom-student",
    "student-available-tests",
    "teacher-classroom",
    "teacher-classrooms",
    "teacher",
  ],
  endpoints: (builder) => ({}),
});
