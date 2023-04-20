import { Student, TestCategory } from "@/models";
import { Classroom } from "@/models/classroom";
import { api } from "./api";
import {
  ClassroomParams,
  StudentParams,
  TeacherParams,
  TestCategoryParams,
} from "../shared";

export const yearOfStudyEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    findTeacherClassrooms: builder.query<Classroom[], TeacherParams>({
      query: ({ yearOfStudyId, teacherId }) => ({
        url: `/years-of-study/${yearOfStudyId}/teachers/${teacherId}/classrooms`,
      }),
      providesTags: ["teacher-classrooms"],
    }),
    findTeacherClassroom: builder.query<Classroom, ClassroomParams>({
      query: ({ yearOfStudyId, teacherId, classroomId }) => ({
        url: `/years-of-study/${yearOfStudyId}/teachers/${teacherId}/classrooms/${classroomId}`,
      }),
      providesTags: ["teacher-classroom"],
    }),
    addTeacherClassroom: builder.mutation<Classroom[], ClassroomParams>({
      query: ({ yearOfStudyId, teacherId, classroomId }) => ({
        url: `/years-of-study/${yearOfStudyId}/teachers/${teacherId}/classrooms/${classroomId}`,
        method: "PUT",
      }),
      invalidatesTags: ["teacher-classrooms"],
    }),
    findClassroomStudent: builder.query<Student, StudentParams>({
      query: ({ yearOfStudyId, classroomId, studentId }) => ({
        url: `/years-of-study/${yearOfStudyId}/classrooms/${classroomId}/students/${studentId}`,
      }),
      providesTags: ["classroom-student"],
    }),
    addClassroomStudent: builder.mutation<Student, StudentParams>({
      query: ({ yearOfStudyId, classroomId, studentId }) => ({
        url: `/years-of-study/${yearOfStudyId}/classrooms/${classroomId}/students/${studentId}`,
        method: "PUT",
      }),
      invalidatesTags: ["teacher-classroom", "classroom-available-students"],
    }),
    findStudentAvailableTests: builder.query<
      TestCategory[],
      Omit<StudentParams, "classroomId">
    >({
      query: ({ yearOfStudyId, studentId }) => ({
        url: `/years-of-study/${yearOfStudyId}/students/${studentId}/available-tests`,
      }),
      providesTags: ["student-available-tests"],
    }),
    addStudentTestCategory: builder.mutation<Student, TestCategoryParams>({
      query: ({ yearOfStudyId, studentId, testCategoryId }) => ({
        url: `/years-of-study/${yearOfStudyId}/students/${studentId}/test-category/${testCategoryId}`,
        method: "PUT",
      }),
      invalidatesTags: ["classroom-student", "student-available-tests"],
    }),
  }),
});
