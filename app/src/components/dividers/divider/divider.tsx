import { Divider as BaseDivider, Typography } from "@mui/material";
import React from "react";

type DividerProps = {
  children: React.ReactNode;
};

const Divider = ({ children, ...props }: DividerProps): JSX.Element => {
  return (
    <BaseDivider
      sx={{
        width: "100%",
        "&::before": {
          display: "none",
        },
      }}
      variant="fullWidth"
      textAlign="left"
      {...props}
    >
      <Typography variant="h6" sx={{ color: "primary.main" }}>
        {children}
      </Typography>
    </BaseDivider>
  );
};

export default Divider;
