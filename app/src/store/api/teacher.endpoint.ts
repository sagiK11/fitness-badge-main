import { Teacher } from "@/models";
import { api } from "./api";

export const teacherEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeacher: builder.query<Teacher, string>({
      query: (email) => `/teachers/${email}`,
      providesTags: ["teacher"],
    }),
  }),
});
