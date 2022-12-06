import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
type SimpleHeaderProps = {};

const SimpleHeader = (props: SimpleHeaderProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => navigate(-1)}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <ArrowBack sx={{ transform: "rotate(180deg)" }} />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SimpleHeader;
