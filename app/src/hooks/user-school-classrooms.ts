import { useGetClassroomsQuery } from "@store/slices/classrooms.slice";

export const useSchoolClassrooms = (
  options?: any
): ReturnType<typeof useGetClassroomsQuery> => {
  return useGetClassroomsQuery(options);
};
