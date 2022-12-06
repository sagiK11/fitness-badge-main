import * as React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { SimpleHeader } from "./common";

type AddModelLayoutProps = {
  children: React.ReactNode;
};

const AddOrEditModelLayout = ({
  children,
}: AddModelLayoutProps): JSX.Element => {
  return (
    <>
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
          className="holder-01"
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export default AddOrEditModelLayout;
