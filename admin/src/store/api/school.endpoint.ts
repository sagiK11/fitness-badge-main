import { api } from "./api";
import { School } from "@/models";

export const schoolEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSchools: builder.query<School[], void>({
      query: () => `/schools`,
      providesTags: ["schools"],
    }),
    getSchool: builder.query<School, string>({
      query: (schoolId) => `/schools/${schoolId}`,
      providesTags: ["school"],
    }),
  }),
});
