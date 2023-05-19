import { api } from "./api";
import { Teacher } from "@/models";

export const teacherEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeachers: builder.query<Teacher[], void>({
      query: () => `/teachers`,
      providesTags: ["teachers"],
    }),
    createTeacher: builder.mutation<Teacher, Partial<Teacher>>({
      query: (body) => ({
        url: `/teachers`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["school-teachers"],
    }),
    updateTeacher: builder.mutation<Teacher, Partial<Teacher>>({
      query: (body) => ({
        url: `/teachers/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["school-teachers"],
    }),
  }),
});
