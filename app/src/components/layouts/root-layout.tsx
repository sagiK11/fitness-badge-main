import * as React from "react";
import Container from "@mui/material/Container";
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return <>{children}</>;
};

export default RootLayout;
