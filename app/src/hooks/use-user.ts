import { Teacher } from "@/models";
import { teacherEndpoints } from "@/store";
import { useAuth } from "./use-auth";

export function useUser() {
  const { user: authUser } = useAuth();
  const email = authUser?.email;

  const { data: user } = teacherEndpoints.useGetTeacherQuery(email as string, {
    skip: !email,
  });
  return user as Teacher;
}
