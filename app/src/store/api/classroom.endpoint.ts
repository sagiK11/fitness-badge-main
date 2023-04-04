import { Teacher } from "@/models";
import { Classroom } from "@/models/classroom";
import { api } from "./api";

interface AddTeacherClassroomPayload {
  teacherId: string;
  //todo
  data: any;
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
    }),
    getClassrooms: builder.query<Classroom[], void>({
      query: () => `/classrooms`,
    }),
    addTeacherClassroom: builder.mutation<Teacher, AddTeacherClassroomPayload>({
      query: ({ teacherId, data }) => ({
        url: `/teachers/${teacherId}/classrooms`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
