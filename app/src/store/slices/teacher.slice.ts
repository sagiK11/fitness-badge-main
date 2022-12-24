import { createSelector } from "@reduxjs/toolkit";
import { mainAPISlice } from "./api.slice";
import { Teacher } from "@models";

export const extendedApiSlice = mainAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherByEmail: builder.query({
      query: (email) => `/teachers/${email}`,
    }),
  }),
});

export const { useGetTeacherByEmailQuery } = extendedApiSlice;
