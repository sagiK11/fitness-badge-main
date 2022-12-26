import * as React from "react";
import { Box } from "@mui/material";
import { AuthCard } from "../cards";
import RootLayout from "./root-layout";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout = ({ children }: BlankLayoutProps): JSX.Element => {
  return (
    <RootLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <AuthCard center>{children}</AuthCard>
      </Box>
    </RootLayout>
  );
};

export default BlankLayout;
