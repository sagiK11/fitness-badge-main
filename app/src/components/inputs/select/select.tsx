import styled from "@emotion/styled";
import { Select } from "@mui/material";

const AppSelect = styled(Select)({
  svg: {
    display: "none",
  },
  "& legend": { textAlign: "right" },
});
export default AppSelect;
