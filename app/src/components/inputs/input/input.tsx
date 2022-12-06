import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const AppTextField = styled(TextField)({
  "& label": {
    transformOrigin: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    fontSize: "small",
    fontWeight: 400,
    overflow: "unset",
  },
  "& legend": { textAlign: "right" },
});
export default AppTextField;
