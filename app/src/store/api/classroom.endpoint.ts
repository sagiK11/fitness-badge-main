import { Classroom } from "@/models/classroom";
import { api } from "./api";
import { Student } from "@/models";

export const classroomEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    findClassrooms: builder.query<Classroom[], { schoolId: string }>({
      query: (params) => ({
        url: `/classrooms`,
        params,
      }),
      providesTags: ["all-classrooms"],
    }),
    findAvailableStudents: builder.query<Student[], string>({
      query: (classroomId) => ({
        url: `/classrooms/${classroomId}/available-students`,
      }),
      providesTags: ["classroom-available-students"],
    }),
  }),
});
