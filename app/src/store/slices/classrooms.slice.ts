import { createEntityAdapter } from "@reduxjs/toolkit";
import { mainAPISlice } from "./api.slice";
import { Classroom } from "@models/classroom";

const classroomsAdapter = createEntityAdapter();
const classroomsInitialState = classroomsAdapter.getInitialState();

const teacherClassroomsAdapter = createEntityAdapter();
const teacherClassroomsInitialState =
  teacherClassroomsAdapter.getInitialState();

export const extendedApiSlice = mainAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherClassrooms: builder.query({
      query: (teacherId) => `/teachers/${teacherId}/classrooms`,
      transformResponse: (responseData: any) => {
        teacherClassroomsAdapter.setAll(
          teacherClassroomsInitialState,
          responseData
        );
        return responseData;
      },
    }),
    getClassrooms: builder.query({
      query: () => `/classrooms`,
      transformResponse: (responseData: any) => {
        classroomsAdapter.setAll(classroomsInitialState, responseData);
        return responseData;
      },
    }),
    addTeacherClassroom: builder.mutation({
      query: ({ teacherId, data }) => ({
        url: `/teachers/${teacherId}/classrooms`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: { data: Classroom[] }, meta, arg) => {
        teacherClassroomsAdapter.addMany(
          teacherClassroomsInitialState,
          response.data
        );
        return response.data;
      },
    }),
  }),
});

export const {
  useGetTeacherClassroomsQuery,
  useGetClassroomsQuery,
  useAddTeacherClassroomMutation,
} = extendedApiSlice;
