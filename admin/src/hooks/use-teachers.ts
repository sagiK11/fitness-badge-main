import { teacherEndpoints } from "@/store";

export function useTeachers() {
  const { data: teachers } = teacherEndpoints.useGetAllTeachersQuery();
  return { teachers };
}
