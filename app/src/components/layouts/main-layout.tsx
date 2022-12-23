import * as React from "react";
import Container from "@mui/material/Container";
import { Box, Button, styled } from "@mui/material";
import { DefaultFooter, DefaultHeader } from "./common";
import { AddCircle } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { routesTree } from "@routes";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <>
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
            "&:first-child": {
              "margin-top": "1rem",
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
        <Button
          component={Link}
          to={routesTree.createStudent}
          variant="contained"
          sx={{
            width: "100%",
            "& .MuiButton-startIcon": { marginLeft: "10px" },
          }}
          startIcon={<AddCircle />}
        >
          הוסף תלמיד חדש
        </Button>
      </Box>

      <DefaultFooter />
    </>
  );
};

export default MainLayout;
