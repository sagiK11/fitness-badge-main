import { schoolEndpoints } from "@/store";

export function useSchools() {
  const { data: schools } = schoolEndpoints.useGetAllSchoolsQuery();
  return { schools };
}
