import { api } from "./api";
import { Test } from "@/models";

export const testEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTests: builder.mutation<Test[], Partial<Test>[]>({
      query: (body) => ({
        url: `/tests`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["classroom-student"],
    }),
  }),
});
