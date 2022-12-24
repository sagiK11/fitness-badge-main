import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { mainAPISlice } from "./api.slice";
import { RootState } from "@store/store";
import { Classroom } from "@models/classroom";

const classroomsAdapter = createEntityAdapter();

const initialState = classroomsAdapter.getInitialState();

export const extendedApiSlice = mainAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherClassrooms: builder.query({
      query: (teacherId) => `/teachers/${teacherId}/classrooms`,
      transformResponse: (responseData: any) => {
        return classroomsAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});

export const { useGetTeacherClassroomsQuery } = extendedApiSlice;

// export const selectClassroomsResult =
//   extendedApiSlice.endpoints.getTeacherClassrooms.select();

// const selectTeacherClassroomsData = createSelector(
//   selectClassroomsResult,
//   (classroomsResult) => {
//     console.log(classroomsResult);
//     return classroomsResult.data;
//   }
// );

// export const {
//   selectAll: selectAllTeacherClassrooms,
//   selectById: selectTeacherClassroomById,
// } = classroomsAdapter.getSelectors(
//   (state: RootState) => selectTeacherClassroomsData(state) ?? initialState
// );
