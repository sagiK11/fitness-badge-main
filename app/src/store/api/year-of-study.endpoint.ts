import { Student } from "@/models";
import { Classroom } from "@/models/classroom";
import { api } from "./api";
import { ClassroomParams, StudentParams, TeacherParams } from "../shared";

export const yearOfStudyEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    findTeacherClassrooms: builder.query<Classroom[], TeacherParams>({
      query: ({ yearOfStudyId, teacherId }) => ({
        url: `years-of-study/${yearOfStudyId}/teachers/${teacherId}/classrooms`,
      }),
      providesTags: ["teacher-classrooms"],
    }),
    findTeacherClassroom: builder.query<Classroom, ClassroomParams>({
      query: ({ yearOfStudyId, teacherId, classroomId }) => ({
        url: `years-of-study/${yearOfStudyId}/teachers/${teacherId}/classrooms/${classroomId}`,
      }),
      providesTags: ["teacher-classroom"],
    }),
    addTeacherClassroom: builder.mutation<Classroom[], ClassroomParams>({
      query: ({ yearOfStudyId, teacherId, classroomId }) => ({
        url: `years-of-study/${yearOfStudyId}/teachers/${teacherId}/classrooms/${classroomId}`,
        method: "PUT",
      }),
      invalidatesTags: ["teacher-classrooms"],
    }),
    findClassroomStudent: builder.query<Student, StudentParams>({
      query: ({ yearOfStudyId, classroomId, studentId }) => ({
        url: `years-of-study/${yearOfStudyId}/classrooms/${classroomId}/students/${studentId}`,
      }),
      providesTags: ["classroom-student"],
    }),
    addClassroomStudent: builder.mutation<Student, StudentParams>({
      query: ({ yearOfStudyId, classroomId, studentId }) => ({
        url: `years-of-study/${yearOfStudyId}/classrooms/${classroomId}/students/${studentId}`,
        method: "PUT",
      }),
      invalidatesTags: ["teacher-classroom"],
    }),
  }),
});
