import { adminEndpoints } from "@/store";
import { useAuth } from "./use-auth";

const first = (str?: string) => str?.charAt(0).toLocaleUpperCase();

export function useAdmin() {
  const { user } = useAuth();

  const { data: admin } = adminEndpoints.useGetAdminQuery(
    user?.email as string,
    {
      skip: !user?.email,
    }
  );
  const initials = `${first(admin?.firstName)} ${first(admin?.lastName)}`;

  return { admin, initials };
}
