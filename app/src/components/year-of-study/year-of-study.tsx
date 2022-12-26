import { useYearOfStudy } from "@hooks";
import { Box, Typography } from "@mui/material";
import { R } from "@resources";

const YearOfStudy = (): JSX.Element => {
  const { current } = useYearOfStudy();

  return (
    <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Typography variant="subtitle1" sx={{ color: "secondary.dark" }}>
        {R.strings.headlines.yearOfStudy}
      </Typography>
      {current?.yearName}
    </Box>
  );
};

export default YearOfStudy;
