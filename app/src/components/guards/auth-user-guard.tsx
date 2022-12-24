import { useAuth } from "@hooks";
import { routesTree } from "@routes";
import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  children?: JSX.Element;
}

const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={routesTree.auth} replace />;
  return children ?? <Outlet />;
};

export default AuthGuard;
