import AuthUserGuard from "./auth-user-guard";
import APIUserGuard from "./api-user-guard";

const AuthGuard = (): JSX.Element => {
  return (
    <AuthUserGuard>
      <APIUserGuard />
    </AuthUserGuard>
  );
};

export default AuthGuard;
