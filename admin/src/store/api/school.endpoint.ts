import { api } from "./api";
import { School, Teacher } from "@/models";

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
    getTeachers: builder.query<Teacher[], string>({
      query: (schoolId) => `/schools/${schoolId}/teachers`,
      providesTags: ["school-teachers"],
    }),
  }),
});
