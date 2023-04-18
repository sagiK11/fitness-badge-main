import { UpdateTestParams } from "../shared";
import { api } from "./api";
import { Test } from "@/models";

export const testEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTests: builder.mutation<Test[], UpdateTestParams[]>({
      query: (body) => ({
        url: `/tests`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["classroom-student"],
    }),
    updateTest: builder.mutation<Test, UpdateTestParams>({
      query: (body) => ({
        url: `/tests/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["classroom-student"],
    }),
  }),
});
