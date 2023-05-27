import { Classroom } from "@/models/classroom";
import { api } from "./api";
import { Student } from "@/models";
import { UploadStudentsPayload } from "../shared";

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
    uploadStudentsFromXlsx: builder.mutation<void, UploadStudentsPayload>({
      query: ({ data, ...params }) => ({
        url: `/classrooms/upload-students`,
        body: data,
        params,
        method: "POST",
      }),
      invalidatesTags: ["teacher-classroom"],
    }),
  }),
});
