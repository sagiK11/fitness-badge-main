import { schoolEndpoints } from "@/store";

export function useSchool(schoolId: string) {
  const { data: school } = schoolEndpoints.useGetSchoolQuery(schoolId);
  return { school };
}
