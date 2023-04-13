import { api } from "./api";
import { TestCategory, UploadGradesPayload } from "@/models";

export const testCategoryEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    findCategories: builder.query<TestCategory[], void>({
      query: () => `/test-categories`,
    }),
    uploadGrades: builder.mutation<void, UploadGradesPayload>({
      query: (payload) => ({
        url: `/test-categories/${payload.testCategoryId}/upload-grades`,
        method: "POST",
        body: payload.data,
      }),
    }),
  }),
});
