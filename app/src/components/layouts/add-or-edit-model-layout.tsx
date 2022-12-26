import * as React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { SimpleHeader } from "./common";
import RootLayout from "./root-layout";

type AddModelLayoutProps = {
  children: React.ReactNode;
};

const AddOrEditModelLayout = ({
  children,
}: AddModelLayoutProps): JSX.Element => {
  return (
    <RootLayout>
      <SimpleHeader />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="md"
          sx={(theme) => ({
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            "&:first-of-type": {
              marginTop: "1rem",
            },
          })}
        >
          {children}
        </Container>
      </Box>
    </RootLayout>
  );
};

export default AddOrEditModelLayout;
