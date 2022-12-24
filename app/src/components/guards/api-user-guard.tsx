import { useAuth } from "@hooks";
import { useGetTeacherByEmailQuery } from "@store/slices/teacher.slice";
import { Outlet } from "react-router-dom";

interface APIGuardProps {
  children?: JSX.Element;
}

const APIGuard = ({ children }: APIGuardProps): JSX.Element | null => {
  const { authUser } = useAuth();
  const { data: teacher } = useGetTeacherByEmailQuery(authUser.email);

  if (!teacher) return <h1>Getting teacher...</h1>;
  return children ?? <Outlet />;
};

export default APIGuard;
