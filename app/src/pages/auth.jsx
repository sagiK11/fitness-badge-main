import { GoogleLogin } from "@react-oauth/google";
import { BlankLayout } from "@components";
import { Box } from "@mui/material";

import { useAuth } from "@hooks";

const AuthPage = (props) => {
  const { login } = useAuth();

  const onLoginSuccess = (credentialResponse) => {
    login(credentialResponse.credential);
  };

  return (
    <BlankLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <GoogleLogin
          onSuccess={onLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
    </BlankLayout>
  );
};

export default AuthPage;
