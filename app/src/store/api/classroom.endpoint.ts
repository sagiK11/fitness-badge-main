import { Classroom } from "@/models/classroom";
import { api } from "./api";

export const classroomEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllClassrooms: builder.query<Classroom[], string>({
      query: (schoolId) => `/classrooms/${schoolId}`,
      providesTags: ["all-classrooms"],
    }),
  }),
});
