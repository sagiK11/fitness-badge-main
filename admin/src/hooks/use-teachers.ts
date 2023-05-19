import { schoolEndpoints } from "@/store";

export function useTeachers(schoolId: string) {
  const { data: teachers } = schoolEndpoints.useGetTeachersQuery(schoolId);
  return { teachers };
}
