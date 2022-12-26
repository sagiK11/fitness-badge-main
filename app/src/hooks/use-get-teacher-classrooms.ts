import { useGetTeacher } from "./use-get-teacher";
import { useGetTeacherClassroomsQuery } from "@store/slices/classrooms.slice";

export const useGetClassrooms = (
  options?: any
): ReturnType<typeof useGetTeacherClassroomsQuery> => {
  const { data: teacher } = useGetTeacher();
  return useGetTeacherClassroomsQuery(teacher.id, options);
};
