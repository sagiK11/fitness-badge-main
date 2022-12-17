import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIConfig } from "@config";

// Define a service using a base URL and expected endpoints
export const mainAPISlice = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery({ baseUrl: APIConfig.endpoint }),
  endpoints: (builder) => ({}),
});
