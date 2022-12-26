import * as React from "react";
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return <>{children}</>;
};

export default RootLayout;
