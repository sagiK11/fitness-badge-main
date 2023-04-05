import { Teacher } from "@/models";
import { Classroom } from "@/models/classroom";
import { api } from "./api";

interface AddTeacherClassroomPayload {
  teacherId: string;
  classroomId: string;
  yearOfStudyId: string;
}
interface GetTeacherClassroomQuery {
  teacherId: string;
  yearOfStudyId?: string;
}
export const classroomEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherClassrooms: builder.query<Classroom[], GetTeacherClassroomQuery>({
      query: (params) => ({
        url: `/teachers/${params.teacherId}/classrooms`,
        params,
      }),
      providesTags: ["teacher-classroom"],
    }),
    getAllClassrooms: builder.query<Classroom[], string>({
      query: (schoolId) => `/classrooms/${schoolId}`,
    }),
    addTeacherClassroom: builder.mutation<Teacher, AddTeacherClassroomPayload>({
      query: (body) => ({
        url: `/teachers/classrooms/add`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["teacher-classroom"],
    }),
  }),
});
