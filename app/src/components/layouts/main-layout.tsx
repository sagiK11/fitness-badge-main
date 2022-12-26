import * as React from "react";
import Container from "@mui/material/Container";
import { Box, Button } from "@mui/material";
import { DefaultFooter, DefaultHeader } from "./common";
import { AddCircle } from "@mui/icons-material";

import { Link } from "react-router-dom";
import RootLayout from "./root-layout";
interface Fab {
  id: string | number;
  text: string;
  to: string;
}

type MainLayoutProps = {
  children: React.ReactNode;
  fabs?: Fab[];
};

const MainLayout = ({ children, fabs }: MainLayoutProps): JSX.Element => {
  return (
    <RootLayout>
      <DefaultHeader />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <Container
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            "&:first-of-type": {
              marginTop: "1rem",
            },
          }}
        >
          {children}
        </Container>
      </Box>

      <Box
        sx={(theme) => ({
          position: "fixed",
          bottom: "3rem",
          right: "2rem",
          [theme.breakpoints.down("lg")]: {
            width: "90%",
            bottom: "0.5rem",
            margin: "0 auto",
            right: "0",
            left: "0",
          },
        })}
      >
        {fabs?.map((fab) => (
          <Button
            key={fab.id}
            component={Link}
            to={fab.to}
            variant="contained"
            sx={{
              width: "100%",
              "& .MuiButton-startIcon": { marginLeft: "10px" },
            }}
            startIcon={<AddCircle />}
          >
            {fab.text}
          </Button>
        ))}
      </Box>

      <DefaultFooter />
    </RootLayout>
  );
};

export default MainLayout;
