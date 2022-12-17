import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { mainAPISlice } from "./api.slice";
import { RootState } from "@store/store";

const teacherAdapter = createEntityAdapter();

const initialState = teacherAdapter.getInitialState();

export const extendedApiSlice = mainAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherByEmail: builder.query<any, void>({
      query: (email) => `/teachers/${email}`,
    }),
  }),
});

export const { useGetTeacherByEmailQuery } = extendedApiSlice;

export const selectTeacherResult =
  extendedApiSlice.endpoints.getTeacherByEmail.select();

const selectTeacherData = createSelector(
  selectTeacherResult,
  (teacherResult) => teacherResult.data
);

export const { selectById: selectTeacherById } = teacherAdapter.getSelectors(
  (state: RootState) => selectTeacherData(state) ?? initialState
);
