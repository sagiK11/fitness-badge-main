import * as React from "react";
import { Box } from "@mui/material";
import { Card } from "../cards";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout = ({ children }: BlankLayoutProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card center>{children}</Card>
    </Box>
  );
};

export default BlankLayout;
