import { Teacher } from "@/models";
import { Classroom } from "@/models/classroom";
import { Student } from "@/models/student";
import { api } from "./api";

interface GetTeacherClassroomStudentsQuery {
  teacherId: string;
  yearOfStudyId?: string;
  classroomId: string;
}

interface GetTeacherClassroomStudentQuery {
  teacherId: string;
  yearOfStudyId?: string;
  classroomId: string;
  studentId: string;
}

export const studentEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherClassroomStudents: builder.query<
      Student[],
      GetTeacherClassroomStudentsQuery
    >({
      query: ({ teacherId, classroomId, ...params }) => ({
        url: `/teachers/${teacherId}/classrooms/${classroomId}`,
        params,
      }),
    }),
    getTeacherClassroomStudent: builder.query<
      Student,
      GetTeacherClassroomStudentQuery
    >({
      query: ({ teacherId, classroomId, studentId, ...params }) => ({
        url: `/teachers/${teacherId}/classrooms/${classroomId}/students/${studentId}`,
        params,
      }),
    }),
  }),
});
