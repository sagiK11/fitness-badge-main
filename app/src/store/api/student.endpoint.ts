import { Student } from "@/models/student";
import { api } from "./api";

export const studentEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query<Student[], { schoolId: string }>({
      query: (params) => ({
        url: `/students`,
        params,
      }),
      providesTags: ["all-students"],
    }),
    updateStudent: builder.mutation<Student, Student>({
      query: (body) => ({
        url: `/students/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["classroom-student"],
    }),
  }),
});
